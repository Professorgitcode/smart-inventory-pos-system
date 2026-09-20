using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using System.Linq;
using backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using backend.DTOs; // for DashboardDto
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<DashboardDto>> GetDashboard()
    {
        // TOTAL SALES
        var totalSales = await _context.OrderItems
            .Include(oi => oi.Product)
            .SumAsync(oi => oi.Quantity * oi.Product.Price);

        // TOTAL PRODUCTS
        var totalProducts = await _context.Products.CountAsync();

        // LOW STOCK
        var lowStockCount = await _context.Products
            .CountAsync(p => p.StockQuantity < 5);

        // RECENT ORDERS
        var recentOrders = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .OrderByDescending(o => o.CreatedAt)
            .Take(5)
            .Select(o => new RecentOrderDto
            {
                OrderId = o.Id,
                Amount = o.TotalAmount,      // use Order model field
                CreatedAt = o.CreatedAt,     // use Order model field
                Status = "Completed"
            })
            .ToListAsync();
            
            // SALES TREND (Daily Aggregation)
      var salesTrend = await _context.Orders
    .Where(o => o.CreatedAt > DateTime.UtcNow.AddYears(-10)) // filter invalid dates
    .GroupBy(o => o.CreatedAt.Date)
    .OrderBy(g => g.Key)
    .Select(g => new SalesTrendDto
    {
        Date = g.Key.ToString("yyyy-MM-dd"),
        TotalRevenue = g.Sum(x => x.TotalAmount),
          OrderCount = g.Count()
    })
    .ToListAsync();

        var response = new DashboardDto
        {
            TotalSales = totalSales,
            TotalProducts = totalProducts,
            LowStockCount = lowStockCount,
            Forecast = "+15% Demand", // placeholder for AI
            RecentOrders = recentOrders,
            SalesTrend = salesTrend // ✅ ADD THIS
        };

        return Ok(response);
    }
}
}