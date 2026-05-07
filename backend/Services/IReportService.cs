using backend.DTOs;

namespace backend.Services
{
    public interface IReportService
    {
        // Sales report with optional date filters
        Task<SalesReportDto> GetSalesReport(
            DateTime? startDate,
            DateTime? endDate
        );

        // Export methods
        Task<byte[]> ExportSalesToCsv();

        Task<byte[]> ExportSalesToPdf();

        Task<byte[]> ExportSalesToExcel();
    }
}