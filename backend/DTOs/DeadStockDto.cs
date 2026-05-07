namespace backend.DTOs
{
    public class DeadStockDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public int CurrentStock { get; set; }

        public int TotalSold { get; set; }

        public int DaysInInventory { get; set; }

        public string RiskLevel { get; set; }
    }
}