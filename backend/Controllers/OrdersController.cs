using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using backend.Data;     // for AppDbContext
using backend.Models;   // for Product model

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto order)
        {
            foreach (var item in order.Items)
{
    var product = await _context.Products.FindAsync(item.ProductId);

    if (product == null)
        return NotFound($"Product {item.ProductId} not found");

    if (product.Stock < item.Quantity)
        return BadRequest($"Not enough stock for {product.Name}");

    product.Stock -= item.Quantity;
}

            await _context.SaveChangesAsync();

            return Ok();
        }
    }

    public class OrderDto
    {
        public List<OrderItemDto> Items { get; set; }
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}