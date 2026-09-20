using backend.DTOs;

namespace backend.Services.Reports
{
    public interface IReportService
    {
        // =====================================
        // SALES REPORT
        // =====================================

        Task<SalesReportDto> GetSalesReport(
            DateTime? startDate,
            DateTime? endDate
        );

        // =====================================
        // EXPORTS
        // =====================================

        Task<byte[]> ExportSalesToPdf();

        Task<byte[]> ExportSalesToExcel();

        Task<byte[]> ExportSalesToCsv();

        Task<byte[]> ExportSalesToDocx();
    }
}
