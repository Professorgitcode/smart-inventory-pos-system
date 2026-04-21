using backend.Models;
using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;
public class DashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardDto> GetDashboardData()
{
    // TOTAL SALES
    var totalSales = await _context.OrderItems
        .Include(oi => oi.Product)
        .SumAsync(oi => oi.Quantity * oi.Product.Price);

    // TOTAL PRODUCTS
    var totalProducts = await _context.Products.CountAsync();

    // LOW STOCK COUNT
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
            Date = DateTime.Now // later replace with CreatedAt
        })
        .ToListAsync();

    // FINAL RETURN (THIS WAS MISSING)
    return new DashboardDto
    {
        TotalSales = totalSales,
        TotalProducts = totalProducts,
        LowStockCount = lowStockCount,
        Forecast = "+15% Demand",
        RecentOrders = recentOrders
    };
}
}