namespace backend.DTOs
{
    public class FastMovingProductDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public int TotalSold { get; set; }

        public decimal AverageDailySales { get; set; }

        public string VelocityCategory { get; set; }

        public int Rank { get; set; }
    }
}