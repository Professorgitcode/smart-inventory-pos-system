using backend.Models;
using System.ComponentModel.DataAnnotations;
namespace backend.Models{
public class Product
{
    public int Id { get; set; }

    [Required]
    [MinLength(2)]
    public string Name { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int Stock { get; set; }
}
}