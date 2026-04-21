using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Data;     // for AppDbContext
using backend.Models;   // for Product model
using backend.Controllers;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
}
}