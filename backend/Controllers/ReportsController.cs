using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        //-----------------------------------
        // GET SALES REPORT DATA
        //-----------------------------------
        [HttpGet]
        public async Task<IActionResult> GetSalesReport(
            DateTime? startDate,
            DateTime? endDate
        )
        {
            var report = await _reportService.GetSalesReport(
                startDate,
                endDate
            );

            return Ok(report);
        }

        //-----------------------------------
        // EXPORT PDF
        //-----------------------------------
        [HttpGet("export/pdf")]
        public async Task<IActionResult> ExportPdf()
        {
            var file = await _reportService.ExportSalesToPdf();

            return File(
                file,
                "application/pdf",
                "sales-report.pdf"
            );
        }

        //-----------------------------------
        // EXPORT EXCEL
        //-----------------------------------
        [HttpGet("export/excel")]
        public async Task<IActionResult> ExportExcel()
        {
            var file = await _reportService.ExportSalesToExcel();

            return File(
                file,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "sales-report.xlsx"
            );
        }

        //-----------------------------------
        // EXPORT CSV
        //-----------------------------------
        [HttpGet("export/csv")]
        public async Task<IActionResult> ExportCsv()
        {
            var file = await _reportService.ExportSalesToCsv();

            return File(
                file,
                "text/csv",
                "sales-report.csv"
            );
        }
    }
}