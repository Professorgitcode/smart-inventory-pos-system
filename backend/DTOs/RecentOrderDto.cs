namespace backend.DTOs
{
    public class RecentOrderDto
    {
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; } 
        public string Status { get; set; }
    }
}