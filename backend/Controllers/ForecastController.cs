using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ForecastController : ControllerBase
    {
        private readonly ForecastService _forecastService;

        public ForecastController(
            ForecastService forecastService
        )
        {
            _forecastService = forecastService;
        }

        [HttpGet]
        public async Task<IActionResult>
            GetForecast()
        {
            var result =
                await _forecastService
                    .GenerateSalesForecast();

            return Ok(result);
        }
    }
}