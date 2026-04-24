using backend.Data;
using backend.Models;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

public class OrderService
{
    private readonly AppDbContext _context;

    public OrderService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Order?> CreateOrder(CreateOrderDto dto)
    {
        var order = new Order
        {
            Items = new List<OrderItem>()
        };

        decimal total = 0;

        foreach (var item in dto.Items)
        {
            var product = await _context.Products.FindAsync(item.ProductId);

            if (product == null)
                return null;

            // 🚨 STOCK VALIDATION
            if (product.StockQuantity < item.Quantity)
                throw new Exception($"Not enough stock for {product.Name}");

            // ✅ DEDUCT STOCK
            product.StockQuantity -= item.Quantity;

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                Price = product.Price
            };

            total += product.Price * item.Quantity;

            order.Items.Add(orderItem);
        }

        order.TotalAmount = total;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return order;
    }
}