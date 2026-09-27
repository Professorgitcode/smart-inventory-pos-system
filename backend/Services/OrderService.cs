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
        // ====================================
        // REQUEST VALIDATION
        // ====================================

        if (dto == null || dto.Items == null || dto.Items.Count == 0)
            throw new ArgumentException(
                "An order must contain at least one item."
            );

        if (dto.Items.Any(item => item.ProductId <= 0))
            throw new ArgumentException(
                "Each order item must reference a valid product."
            );

        if (dto.Items.Any(item => item.Quantity <= 0))
            throw new ArgumentException(
                "Each order item quantity must be greater than zero."
            );

        // ====================================
        // CREATE ORDER
        // ====================================

        var order = new Order
        {
            // Orders are currently recorded in the server's
            // local business timezone (Africa/Harare).
            CreatedAt = DateTime.Now,
            Items = new List<OrderItem>()
        };

        decimal total = 0;

        foreach (var item in dto.Items)
        {
            var product =
                await _context.Products.FindAsync(
                    item.ProductId
                );

            if (product == null)
                return null;

            // ====================================
            // STOCK VALIDATION
            // ====================================

            if (product.StockQuantity < item.Quantity)
            {
                throw new InvalidOperationException(
                    $"Not enough stock for {product.Name}"
                );
            }

            // ====================================
            // DEDUCT STOCK
            // ====================================

            product.StockQuantity -= item.Quantity;

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                Price = product.Price
            };

            total +=
                product.Price *
                item.Quantity;

            order.Items.Add(orderItem);
        }

        // ====================================
        // AUTHORITATIVE ORDER TOTAL
        // ====================================

        order.TotalAmount = total;

        _context.Orders.Add(order);

        await _context.SaveChangesAsync();

        return order;
    }
}
