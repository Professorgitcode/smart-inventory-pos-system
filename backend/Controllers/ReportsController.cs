using backend.Services.Reports;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSalesReport(
            DateTime? startDate,
            DateTime? endDate)
        {
            var report = await _reportService
                .GetSalesReport(startDate, endDate);

            return Ok(report);
        }

        [HttpGet("export/pdf")]
        public async Task<IActionResult> ExportPdf()
        {
            var file = await _reportService.ExportSalesToPdf();

            return File(
                file,
                "application/pdf",
                "sales-report.pdf");
        }

        [HttpGet("export/excel")]
        public async Task<IActionResult> ExportExcel()
        {
            var file = await _reportService.ExportSalesToExcel();

            return File(
                file,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "sales-report.xlsx");
        }

        [HttpGet("export/csv")]
        public async Task<IActionResult> ExportCsv()
        {
            var file = await _reportService.ExportSalesToCsv();

            return File(
                file,
                "text/csv",
                "sales-report.csv");
        }

        [HttpGet("export/docx")]
        public async Task<IActionResult> ExportDocx()
        {
            var file = await _reportService.ExportSalesToDocx();

            return File(
                file,
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "sales-report.docx");
        }
    }
}
