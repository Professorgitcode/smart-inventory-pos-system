using backend.Data;
using backend.DTOs;
using ClosedXML.Excel;
using QuestPDF.Fluent;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ReportService : IReportService
    {
        private readonly AppDbContext _context;

        public ReportService(AppDbContext context)
        {
            _context = context;
        }

public async Task<byte[]> ExportSalesToExcel()
{
    var orders = await _context.Orders.ToListAsync();
    using var workbook = new XLWorkbook();
    var worksheet = workbook.Worksheets.Add("Sales Report");
    worksheet.Cell(1,1).Value = "Order ID";
    worksheet.Cell(1,2).Value = "Date";
    worksheet.Cell(1,3).Value = "Total";
    int row = 2;

    foreach(var order in orders)
    {
        worksheet.Cell(row,1).Value = order.Id;
        worksheet.Cell(row,2).Value = order.CreatedAt;
        worksheet.Cell(row,3).Value = order.TotalAmount;
        row++;
    }

    using var stream = new MemoryStream();
    workbook.SaveAs(stream);

    return stream.ToArray();
}

public async Task<byte[]> ExportSalesToPdf()
{
    var orders = await _context.Orders.ToListAsync();

    var document = Document.Create(container =>
    {
        container.Page(page =>
        {
            page.Content().Column(col =>
            {
                col.Item().Text("Sales Report")
                    .FontSize(20);

                foreach(var order in orders)
                {
                    col.Item().Text(
                        $"Order #{order.Id} - ${order.TotalAmount}"
                    );
                }
            });
        });
    });

    return document.GeneratePdf();
}
public async Task<byte[]> ExportSalesToCsv()
{
    var orders = await _context.Orders
        .Include(o => o.Items)
        .ThenInclude(i => i.Product)
        .ToListAsync();

    var csv = new StringBuilder();

    csv.AppendLine("OrderId,Date,TotalAmount");

    foreach (var order in orders)
    {
        csv.AppendLine($"{order.Id},{order.CreatedAt},{order.TotalAmount}");
    }

    return Encoding.UTF8.GetBytes(csv.ToString());
}
      public async Task<SalesReportDto> GetSalesReport(
    DateTime? startDate,
    DateTime? endDate)
{
    var ordersQuery = _context.Orders
        .Include(o => o.Items)
        .ThenInclude(i => i.Product)
        .AsQueryable();

    if (startDate.HasValue && endDate.HasValue)
    {
        ordersQuery = ordersQuery.Where(o =>
            o.CreatedAt >= startDate.Value &&
            o.CreatedAt <= endDate.Value
        );
    }

    var orders = await ordersQuery.ToListAsync();

    var salesTrend = orders
    .GroupBy(o => o.CreatedAt.Date)
    .Select(g => new SalesTrendDto
    {
        Date = g.Key.ToString("yyyy-MM-dd"),
        TotalRevenue = g.Sum(x => x.TotalAmount),
        OrderCount = g.Count()
    })
    .OrderBy(x => x.Date)
    .ToList();

    var forecast = new List<ForecastPointDto>();

// LAST 7 DAYS AVERAGE
var recentRevenue = salesTrend
    .TakeLast(7)
    .Select(x => x.TotalRevenue)
    .ToList();

decimal movingAverage = 0;

if (recentRevenue.Count > 0)
{
    movingAverage = recentRevenue.Average();
}

// PREDICT NEXT 7 DAYS
for (int i = 1; i <= 7; i++)
{
    forecast.Add(new ForecastPointDto
    {
        Date = DateTime.Today
            .AddDays(i)
            .ToString("yyyy-MM-dd"),

        PredictedRevenue = movingAverage
    });
}

    var todayRevenue = orders
        .Where(o => o.CreatedAt.Date == DateTime.Today)
        .Sum(o => o.TotalAmount);

    var weeklyRevenue = orders
        .Where(o => o.CreatedAt >= DateTime.Today.AddDays(-7))
        .Sum(o => o.TotalAmount);

    var totalOrders = orders.Count;

    var bestSeller = orders
        .SelectMany(o => o.Items)
        .GroupBy(i => i.Product.Name)
        .OrderByDescending(g => g.Sum(x => x.Quantity))
        .Select(g => g.Key)
        .FirstOrDefault() ?? "No sales yet";

    // ADD THIS SECTION
    var recentOrders = orders
        .OrderByDescending(o => o.CreatedAt)
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
        RecentOrders = recentOrders, // VERY IMPORTANT
        SalesTrend = salesTrend,
        Forecast = forecast
    };
}
    }
}