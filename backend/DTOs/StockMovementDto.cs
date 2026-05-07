namespace backend.DTOs
{
    public class StockMovementDto
    {
        public string ProductName { get; set; }

        public int CurrentStock { get; set; }

        public int TotalSold { get; set; }

        public decimal DepletionRate { get; set; }

        public string Trend { get; set; }
    }
}