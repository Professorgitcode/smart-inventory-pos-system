using backend.Data;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Text;

namespace backend.Services
{
    public class ReportExportService
    {
        private readonly AppDbContext _context;

        public ReportExportService(AppDbContext context)
        {
            _context = context;
        }

        // ---------------- PDF EXPORT ----------------
        public async Task<byte[]> ExportPdfAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .ToListAsync();

            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(30);

                    page.Header()
                        .Text("Sales Report")
                        .FontSize(20)
                        .Bold();

                    page.Content().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        table.Header(header =>
                        {
                            header.Cell().Text("Order ID");
                            header.Cell().Text("Date");
                            header.Cell().Text("Amount");
                        });

                        foreach (var order in orders)
                        {
                            table.Cell().Text(order.Id.ToString());
                            table.Cell().Text(order.CreatedAt.ToShortDateString());
                            table.Cell().Text(order.TotalAmount.ToString("C"));
                        }
                    });
                });
            });

            return document.GeneratePdf();
        }

        // ---------------- CSV EXPORT ----------------
        public async Task<string> ExportCsvAsync()
        {
            var orders = await _context.Orders.ToListAsync();

            var csv = new StringBuilder();

            csv.AppendLine("OrderId,Date,Amount");

            foreach (var order in orders)
            {
                csv.AppendLine($"{order.Id},{order.CreatedAt},{order.TotalAmount}");
            }

            return csv.ToString();
        }

        // ---------------- EXCEL EXPORT ----------------
        public async Task<byte[]> ExportExcelAsync()
        {
            var orders = await _context.Orders.ToListAsync();

            using var workbook = new XLWorkbook();

            var worksheet = workbook.Worksheets.Add("Sales Report");

            worksheet.Cell(1, 1).Value = "Order ID";
            worksheet.Cell(1, 2).Value = "Date";
            worksheet.Cell(1, 3).Value = "Amount";

            int row = 2;

            foreach (var order in orders)
            {
                worksheet.Cell(row, 1).Value = order.Id;
                worksheet.Cell(row, 2).Value = order.CreatedAt;
                worksheet.Cell(row, 3).Value = order.TotalAmount;

                row++;
            }

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);

            return stream.ToArray();
        }
    }
}