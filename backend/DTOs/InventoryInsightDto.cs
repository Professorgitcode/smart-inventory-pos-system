namespace backend.DTOs
{
    public class InventoryInsightDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public int StockQuantity { get; set; }

        public int TotalSold { get; set; }

        public decimal AverageDailySales { get; set; }

        public int EstimatedDaysRemaining { get; set; }

        public string Urgency { get; set; }
    }
}