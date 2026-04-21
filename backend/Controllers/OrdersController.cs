using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using backend.Data;     // for AppDbContext
using backend.Models;   // for Product model
using backend.DTOs;     // for Order DTOs

namespace backend.Controllers
{
   [ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
    {
        var order = new Order
        {
            CreatedAt = DateTime.Now,
            TotalAmount = dto.TotalAmount
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        foreach (var item in dto.Items)
        {
            _context.OrderItems.Add(new OrderItem
            {
                OrderId = order.Id,
                ProductId = item.ProductId,
                Quantity = item.Quantity
            });

            var product = await _context.Products.FindAsync(item.ProductId);
            product.StockQuantity -= item.Quantity;
        }

        await _context.SaveChangesAsync();

        return Ok(order);
    }
} 
   
}