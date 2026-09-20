using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/productforecast")]
    [Authorize]
    public class ProductForecastController
        : ControllerBase
    {
        private readonly ProductForecastService
            _forecastService;

        public ProductForecastController(
            ProductForecastService forecastService)
        {
            _forecastService =
                forecastService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data =
                await _forecastService
                    .GenerateProductForecast();

            return Ok(data);
        }
    }
}