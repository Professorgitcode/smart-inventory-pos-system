using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services.Reports.Exports.Csv;
using backend.Services.Reports.Exports.Docx;
using backend.Services.Reports.Exports.Excel;
using backend.Services.Reports.Exports.Pdf;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Reports
{
    public class ReportService : IReportService
    {
        private readonly AppDbContext _context;
        private readonly SalesReportPdfExporter _pdfExporter;
        private readonly SalesReportExcelExporter _excelExporter;
        private readonly SalesReportCsvExporter _csvExporter;
        private readonly SalesReportDocxExporter _docxExporter;

        public ReportService(
            AppDbContext context,
            SalesReportPdfExporter pdfExporter,
            SalesReportExcelExporter excelExporter,
            SalesReportCsvExporter csvExporter,
            SalesReportDocxExporter docxExporter)
        {
            _context = context;
            _pdfExporter = pdfExporter;
            _excelExporter = excelExporter;
            _csvExporter = csvExporter;
            _docxExporter = docxExporter;
        }

        public async Task<SalesReportDto> GetSalesReport(
            DateTime? startDate,
            DateTime? endDate)
        {
            var query = _context.Orders
                .AsNoTracking()
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .AsQueryable();

            if (startDate.HasValue && endDate.HasValue)
            {
                query = query.Where(o =>
                    o.CreatedAt.Date >= startDate.Value.Date &&
                    o.CreatedAt.Date <= endDate.Value.Date);
            }

            var orders = await query
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            var today = DateTime.Today;

            var todayRevenue = orders
                .Where(o => o.CreatedAt.Date == today)
                .Sum(o => o.TotalAmount);

            var weekStart = today.AddDays(-6);

            var weeklyRevenue = orders
                .Where(o =>
                    o.CreatedAt.Date >= weekStart &&
                    o.CreatedAt.Date <= today)
                .Sum(o => o.TotalAmount);

            var totalOrders = orders.Count;

            var bestSeller = orders
                .SelectMany(o => o.Items)
                .GroupBy(i => i.Product.Name)
                .OrderByDescending(g =>
                    g.Sum(i => i.Quantity))
                .Select(g => g.Key)
                .FirstOrDefault() ?? "N/A";

            var salesTrend = orders
                .GroupBy(o => o.CreatedAt.Date)
                .OrderBy(g => g.Key)
                .Select(g => new SalesTrendDto
                {
                    Date = g.Key.ToString("yyyy-MM-dd"),
                    TotalRevenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .ToList();

            var recentDailyRevenue = salesTrend
                .TakeLast(7)
                .Select(x => x.TotalRevenue)
                .ToList();

            var averageRevenue = recentDailyRevenue.Any()
                ? recentDailyRevenue.Average()
                : 0;

            var forecast = Enumerable
                .Range(1, 7)
                .Select(i => new ForecastPointDto
                {
                    Date = today
                        .AddDays(i)
                        .ToString("yyyy-MM-dd"),

                    PredictedRevenue = averageRevenue
                })
                .ToList();

            var recentOrders = orders
                .Take(5)
                .Select(o => new RecentOrderDto
                {
                    OrderId = o.Id,
                    CreatedAt = o.CreatedAt,
                    Amount = o.TotalAmount,
                    Status = "Completed"
                })
                .ToList();

            return new SalesReportDto
            {
                TodayRevenue = todayRevenue,
                WeeklyRevenue = weeklyRevenue,
                TotalOrders = totalOrders,
                BestSeller = bestSeller,
                SalesTrend = salesTrend,
                Forecast = forecast,
                RecentOrders = recentOrders
            };
        }

        public async Task<byte[]> ExportSalesToPdf()
        {
            var orders = await GetOrdersForExport();
            return _pdfExporter.Export(orders);
        }

        public async Task<byte[]> ExportSalesToExcel()
        {
            var orders = await GetOrdersForExport();
            return _excelExporter.Export(orders);
        }

        public async Task<byte[]> ExportSalesToCsv()
        {
            var orders = await GetOrdersForExport();
            return _csvExporter.Export(orders);
        }

        public async Task<byte[]> ExportSalesToDocx()
        {
            var orders = await GetOrdersForExport();
            return _docxExporter.Export(orders);
        }

        private async Task<List<Order>> GetOrdersForExport()
        {
            return await _context.Orders
                .AsNoTracking()
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();
        }
    }
}
