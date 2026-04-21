using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Data;     // for AppDbContext
using backend.Models;   // for Product model
using backend.DTOs;     // for Report DTOs

namespace backend.Controllers
{
[ApiController]
[Route("api/reports")]
public class ReportsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReportsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetReport()
    {
        var todayRevenue = await _context.Orders
            .Where(o => o.CreatedAt.Date == DateTime.Today)
            .SumAsync(o => o.TotalAmount);

        var weeklyRevenue = await _context.Orders
            .Where(o => o.CreatedAt >= DateTime.Now.AddDays(-7))
            .SumAsync(o => o.TotalAmount);

        var totalOrders = await _context.Orders.CountAsync();

        return Ok(new {
            todayRevenue,
            weeklyRevenue,
            totalOrders
        });
    }
}
}