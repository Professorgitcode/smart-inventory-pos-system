using backend.Data;
using backend.Models;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ProductForecastService
    {
        private readonly AppDbContext _context;

        public ProductForecastService(
            AppDbContext context)
        {
            _context = context;
        }

        // ===============================
        // CONFIDENCE CALCULATOR
        // ===============================
        private int CalculateConfidence(
            decimal avgSales)
        {
            if (avgSales >= 20)
                return 95;

            if (avgSales >= 10)
                return 85;

            if (avgSales >= 5)
                return 75;

            return 60;
        }

        // ===============================
        // PRODUCT FORECAST ENGINE
        // ===============================
        public async Task<List<ProductForecastDto>> GenerateProductForecast()
        {
            var last30Days =
                DateTime.UtcNow.AddDays(-30);

            var productSales =
                await _context.OrderItems
                .Where(x =>
                    x.Order.CreatedAt >= last30Days)
                .GroupBy(x => new
                {
                    x.ProductId,
                    x.Product.Name,
                    x.Product.StockQuantity
                })
                .Select(g => new
                {
                    ProductId = g.Key.ProductId,

                    ProductName =
                        g.Key.Name,

                    CurrentStock =
                        g.Key.StockQuantity,

                    TotalSold =
                        g.Sum(x => x.Quantity)
                })
                .ToListAsync();

            var results =
                new List<ProductForecastDto>();

            foreach (var item in productSales)
            {
                // DAILY SALES AVG
                decimal avgDailySales =
                    (decimal)item.TotalSold / 30;

                // NEXT 7 DAYS PREDICTION
                int predictedDemand =
                    (int)Math.Ceiling(
                        avgDailySales * 7);

                // SMART RESTOCK
                int recommendedRestock =
                    predictedDemand >
                    item.CurrentStock

                    ? predictedDemand -
                      item.CurrentStock

                    : 0;

                int confidence =
                    CalculateConfidence(
                        avgDailySales);

                results.Add(
                    new ProductForecastDto
                    {
                        ProductId =
                            item.ProductId,

                        ProductName =
                            item.ProductName,

                        CurrentStock =
                            item.CurrentStock,

                        AverageDailySales =
                            Math.Round(
                                avgDailySales,
                                2),

                        PredictedDemand =
                            predictedDemand,

                        RecommendedRestock =
                            recommendedRestock,

                        ConfidenceScore =
                            confidence
                    });
            }

            return results
                .OrderByDescending(
                    x => x.PredictedDemand)
                .ToList();
        }
    }
}