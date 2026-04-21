using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Data;     // for AppDbContext
using backend.Models;   // for Product model
using backend.Controllers;
using backend.DTOs;
using System.ComponentModel.DataAnnotations;
namespace backend.DTOs
{
    public class CreateOrderDto
{
    [Range(0, double.MaxValue, ErrorMessage = "Total amount must be a positive number")]
    public decimal TotalAmount { get; set; }
    public List<OrderItemDto> Items { get; set; }
}

public class OrderItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}
}