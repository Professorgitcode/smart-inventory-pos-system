using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/inventory-insights")]
    public class InventoryInsightsController : ControllerBase
    {
        private readonly InventoryInsightService _service;

        public InventoryInsightsController(InventoryInsightService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetInsights()
        {
            var data = await _service.GetInventoryInsights();

            return Ok(data);
        }

        [HttpGet("reorder")]
        public async Task<IActionResult> GetReorderSuggestions()
        {
            var data = await _service.GetReorderSuggestions();

            return Ok(data);
        }

        [HttpGet("stock-movement")]
        public async Task<IActionResult> GetStockMovement()
        {
            var data = await _service.GetStockMovementAnalytics();

            return Ok(data);
        }

        [HttpGet("dead-stock")]
        public async Task<IActionResult> GetDeadStock()
        {
            var data =
            await _service.GetDeadStockAnalysis();

            return Ok(data);
        }

        [HttpGet("fast-moving")]
        public async Task<IActionResult> GetFastMovingProducts()
        {
            var data =
            await _service.GetFastMovingProducts();

            return Ok(data);
        }
    }
}