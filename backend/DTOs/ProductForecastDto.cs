using backend.Models;
namespace backend.DTOs
{
    public class ProductForecastDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public int CurrentStock { get; set; }

        public decimal AverageDailySales { get; set; }

        public int PredictedDemand { get; set; }

        public int RecommendedRestock { get; set; }

        public int ConfidenceScore { get; set; }
        
    }
}