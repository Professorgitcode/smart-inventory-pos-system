namespace backend.DTOs.Reports;

public class SalesReportDto
{
    public string OrderId { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public DateTime CreatedAt { get; set; }
}