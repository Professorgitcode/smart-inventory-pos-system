using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class InventoryInsightService
    {
        private readonly AppDbContext _context;

        public InventoryInsightService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<InventoryInsightDto>> GetInventoryInsights()
        {
            var products = await _context.Products
                .Include(p => p.OrderItems)
                .ToListAsync();

            var insights = new List<InventoryInsightDto>();

            foreach (var product in products)
            {
                // TOTAL SOLD
                var totalSold = product.OrderItems?
                    .Sum(oi => oi.Quantity) ?? 0;

                // AVERAGE DAILY SALES
                decimal averageDailySales =
                    totalSold / 30m;

                // DAYS REMAINING
                int estimatedDaysRemaining =
                    averageDailySales > 0
                    ? (int)(product.StockQuantity / averageDailySales)
                    : 999;

                // URGENCY LOGIC
                string urgency;

                if (product.StockQuantity <= 5)
                {
                    urgency = "CRITICAL";
                }
                else if (estimatedDaysRemaining <= 7)
                {
                    urgency = "LOW";
                }
                else
                {
                    urgency = "STABLE";
                }

                insights.Add(new InventoryInsightDto
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    StockQuantity = product.StockQuantity,
                    TotalSold = totalSold,
                    AverageDailySales =
                        Math.Round(averageDailySales, 2),
                    EstimatedDaysRemaining =
                        estimatedDaysRemaining,
                    Urgency = urgency
                });
            }

            return insights
                .OrderBy(i => i.EstimatedDaysRemaining)
                .ToList();
        }

        public async Task<List<StockMovementDto>>
    GetStockMovementAnalytics()
{
    var products = await _context.Products
        .Include(p => p.OrderItems)
        .ToListAsync();

    var result = products.Select(product =>
    {
        var totalSold = product.OrderItems
            .Sum(oi => oi.Quantity);

        decimal depletionRate =
            totalSold == 0
                ? 0
                : (decimal)totalSold /
                  (product.StockQuantity + totalSold);

        string trend =
            depletionRate >= 0.7m
                ? "FAST"
                : depletionRate >= 0.3m
                    ? "MODERATE"
                    : "SLOW";

        return new StockMovementDto
        {
            ProductName = product.Name,
            CurrentStock = product.StockQuantity,
            TotalSold = totalSold,
            DepletionRate =
                Math.Round(depletionRate * 100, 2),
            Trend = trend
        };
    })
    .OrderByDescending(x => x.DepletionRate)
    .ToList();

    return result;
}

        public async Task<List<DeadStockDto>>
    GetDeadStockAnalysis()
{
    var products = await _context.Products
        .Include(p => p.OrderItems)
        .ToListAsync();

    var deadStock = products
        .Select(product =>
        {
            var totalSold = product.OrderItems
                .Sum(oi => oi.Quantity);

            int daysInInventory =
                totalSold == 0
                    ? 365
                    : Math.Max(
                        30,
                        365 - (totalSold * 5)
                    );

            string riskLevel =
                totalSold == 0
                    ? "HIGH"
                    : totalSold <= 5
                        ? "MEDIUM"
                        : "LOW";

            return new DeadStockDto
            {
                ProductId = product.Id,
                ProductName = product.Name,
                CurrentStock = product.StockQuantity,
                TotalSold = totalSold,
                DaysInInventory = daysInInventory,
                RiskLevel = riskLevel
            };
        })
        .Where(x =>
            x.RiskLevel == "HIGH" ||
            x.RiskLevel == "MEDIUM")
        .OrderByDescending(x => x.DaysInInventory)
        .ToList();

    return deadStock;
}

        public async Task<List<FastMovingProductDto>>
    GetFastMovingProducts()
{
    var products = await _context.Products
        .Include(p => p.OrderItems)
        .ToListAsync();

    var rankedProducts = products
        .Select(product =>
        {
            var totalSold = product.OrderItems
                .Sum(oi => oi.Quantity);

            decimal avgDailySales =
                Math.Round(
                    (decimal)totalSold / 30,
                    2
                );

            string velocity =
                avgDailySales >= 5
                    ? "FAST"
                    : avgDailySales >= 2
                        ? "MODERATE"
                        : "SLOW";

            return new
            {
                Product = product,
                TotalSold = totalSold,
                AverageDailySales = avgDailySales,
                Velocity = velocity
            };
        })
        .OrderByDescending(x => x.TotalSold)
        .ToList();

    var result = rankedProducts
        .Select((x, index) =>
            new FastMovingProductDto
            {
                ProductId = x.Product.Id,
                ProductName = x.Product.Name,
                TotalSold = x.TotalSold,
                AverageDailySales =
                    x.AverageDailySales,
                VelocityCategory =
                    x.Velocity,
                Rank = index + 1
            })
        .Take(10)
        .ToList();

    return result;
}
        public async Task<List<ReorderSuggestionDto>> GetReorderSuggestions()
        {
            var insights = await GetInventoryInsights();

            var reorderSuggestions = insights
                .Where(i =>
                    i.Urgency == "CRITICAL" ||
                    i.Urgency == "LOW")
                .Select(i => new ReorderSuggestionDto
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    CurrentStock = i.StockQuantity,

                    SuggestedReorderQuantity =
                        Math.Max(20, i.TotalSold / 2),

                    Urgency = i.Urgency
                })
                .ToList();

            return reorderSuggestions;
        }
    }
}