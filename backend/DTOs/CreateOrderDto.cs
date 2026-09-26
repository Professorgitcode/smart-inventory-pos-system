using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CreateOrderDto
    {
        // ====================================
        // ORDER ITEMS
        // ====================================

        [Required]
        [MinLength(1)]
        public List<OrderItemDto> Items { get; set; } = new();
    }

    public class OrderItemDto
    {
        // ====================================
        // PRODUCT
        // ====================================

        [Range(1, int.MaxValue)]
        public int ProductId { get; set; }

        // ====================================
        // QUANTITY
        // ====================================

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}
