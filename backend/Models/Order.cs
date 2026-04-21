using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace backend.Models
{
public class Order
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal TotalAmount { get; set; }

    public List<OrderItem> Items { get; set; }
}
}