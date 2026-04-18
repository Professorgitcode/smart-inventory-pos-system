using backend.Models;
namespace backend.Models
{
public class OrderItem
{
    public int Id { get; set; }
    public int ProductId { get; set; }
     public Product Product { get; set; } // REQUIRED
    public int Quantity { get; set; }
}
}