namespace backend.DTOs
{
    public class ForecastPointDto
    {
        public string Date { get; set; }

        public decimal ActualRevenue { get; set; }

        public decimal PredictedRevenue { get; set; }

         public int ConfidenceScore { get; set; }
    }
}