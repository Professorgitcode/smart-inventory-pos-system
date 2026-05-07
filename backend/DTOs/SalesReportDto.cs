namespace backend.DTOs
{
    public class SalesReportDto
    {
        public decimal TodayRevenue { get; set; }
        public decimal WeeklyRevenue { get; set; }
        public int TotalOrders { get; set; }
        public string BestSeller { get; set; }
        public List<SalesTrendDto> SalesTrend { get; set; }
        public List<ForecastPointDto> Forecast { get; set; }
        public List<RecentOrderDto> RecentOrders { get; set; }
    }
}