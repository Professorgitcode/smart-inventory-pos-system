namespace backend.Models
{
    public class Supplier
    {
        public int SupplierId { get; set; }

        public string SupplierName { get; set; }

        public string ContactPerson { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public decimal Rating { get; set; }

        public decimal OnTimeDeliveryRate { get; set; }

        public int AverageLeadTime { get; set; }

        public int TotalOrders { get; set; }

        public string Status { get; set; }

    }
}