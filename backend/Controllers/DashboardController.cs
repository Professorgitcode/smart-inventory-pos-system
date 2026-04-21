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
            .OrderByDescending(o => o.Id)
            .Take(5)
            .Select(o => new RecentOrderDto
            {
                OrderId = o.Id,
                Total = o.Items.Sum(i => i.Quantity * i.Product.Price),
                Date = DateTime.Now // Replace later with real CreatedAt
            })
            .ToListAsync();

        var response = new DashboardDto
        {
            TotalSales = totalSales,
            TotalProducts = totalProducts,
            LowStockCount = lowStockCount,
            Forecast = "+15% Demand", // placeholder for AI
            RecentOrders = recentOrders
        };

        return Ok(response);
    }
}
}