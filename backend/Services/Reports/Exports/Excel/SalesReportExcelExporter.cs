using backend.Models;
using ClosedXML.Excel;

namespace backend.Services.Reports.Exports.Excel
{
    public class SalesReportExcelExporter
    {
        // =====================================
        // EXPORT SALES REPORT TO EXCEL
        // =====================================

        public byte[] Export(
            IReadOnlyList<Order> orders)
        {
            using var workbook = new XLWorkbook();

            var worksheet =
                workbook.Worksheets.Add("Sales Report");

            // =====================================
            // REPORT TITLE
            // =====================================

            worksheet.Cell(1, 1)
                .Value = "SALES REPORT";

            worksheet.Range(1, 1, 1, 3)
                .Merge();

            worksheet.Cell(1, 1)
                .Style.Font.Bold = true;

            worksheet.Cell(1, 1)
                .Style.Font.FontSize = 18;

            // =====================================
            // COLUMN HEADERS
            // =====================================

            worksheet.Cell(3, 1)
                .Value = "Order ID";

            worksheet.Cell(3, 2)
                .Value = "Date";

            worksheet.Cell(3, 3)
                .Value = "Amount";

            worksheet.Range(3, 1, 3, 3)
                .Style.Font.Bold = true;

            // =====================================
            // ORDER DATA
            // =====================================

            var row = 4;

            foreach (var order in orders)
            {
                worksheet.Cell(row, 1)
                    .Value = order.Id;

                worksheet.Cell(row, 2)
                    .Value = order.CreatedAt;

                worksheet.Cell(row, 3)
                    .Value = order.TotalAmount;

                row++;
            }

            // =====================================
            // COLUMN FORMATTING
            // =====================================

            worksheet.Column(1)
                .AdjustToContents();

            worksheet.Column(2)
                .AdjustToContents();

            worksheet.Column(3)
                .AdjustToContents();

            worksheet.Column(2)
                .Style.DateFormat.Format =
                "yyyy-MM-dd";

            worksheet.Column(3)
                .Style.NumberFormat.Format =
                "$#,##0.00";

            // =====================================
            // FILTER
            // =====================================

            if (orders.Count > 0)
            {
                worksheet.Range(
                    3,
                    1,
                    row - 1,
                    3
                ).SetAutoFilter();
            }

            // =====================================
            // FREEZE HEADER
            // =====================================

            worksheet.SheetView.FreezeRows(3);

            // =====================================
            // GENERATE FILE
            // =====================================

            using var stream =
                new MemoryStream();

            workbook.SaveAs(stream);

            return stream.ToArray();
        }
    }
}