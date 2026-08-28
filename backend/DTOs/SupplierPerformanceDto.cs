namespace backend.DTOs
{
    public class SupplierPerformanceDto
    {
        public string SupplierName { get; set; }

        public decimal Rating { get; set; }

        public decimal DeliveryRate { get; set; }

        public int LeadTime { get; set; }

        public decimal SupplierScore { get; set; }

        // New code added
         public string Month { get; set; }
         
        public decimal Delivery { get; set; }
    }
}