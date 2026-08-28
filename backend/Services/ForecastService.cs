using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ForecastService
    {
        private readonly AppDbContext _context;

        public ForecastService(AppDbContext context)
        {
            _context = context;
        }

        // ===============================
        // CONFIDENCE SCORE CALCULATOR
        // ===============================
        private int CalculateConfidence(
            decimal actual,
            decimal predicted)
        {
            if (actual == 0)
                return 50;

            decimal variance =
                Math.Abs(actual - predicted);

            decimal variancePercent =
                variance / actual;

            int confidence =
                (int)((1 - variancePercent) * 100);

            // LIMIT SCORE RANGE
            if (confidence < 0)
                confidence = 0;

            if (confidence > 100)
                confidence = 100;

            return confidence;
        }

        // ===============================
        // SALES FORECAST GENERATOR
        // ===============================
        public async Task<List<ForecastPointDto>>
            GenerateSalesForecast()
        {
            // GET LAST 14 DAYS SALES
            var salesData = await _context.Orders
                .GroupBy(o => o.CreatedAt.Date)
                .Select(g => new
                {
                    Date = g.Key,
                    Revenue = g.Sum(x => x.TotalAmount)
                })
                .OrderBy(x => x.Date)
                .Take(14)
                .ToListAsync();

            var forecast =
                new List<ForecastPointDto>();

            for (int i = 0;
                i < salesData.Count;
                i++)
            {
                var current = salesData[i];

                // MOVING AVERAGE PREDICTION
                var previousData = salesData
                    .Take(i + 1)
                    .Select(x => x.Revenue)
                    .ToList();

                decimal predicted =
                    previousData.Average();

                int confidence =
                    CalculateConfidence(
                        current.Revenue,
                        predicted
                    );

                forecast.Add(
                    new ForecastPointDto
                    {
                        Date = current.Date
                            .ToString("yyyy-MM-dd"),

                        ActualRevenue =
                            current.Revenue,

                        PredictedRevenue =
                            Math.Round(predicted, 2),

                        ConfidenceScore =
                            confidence
                    }
                );
            }

            return forecast;
        }
    }
}