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
public class DashboardDto
{
    public decimal TotalSales { get; set; }
    public int TotalProducts { get; set; }
    public int LowStockCount { get; set; }
    public string Forecast { get; set; }

    public List<RecentOrderDto> RecentOrders { get; set; }
}

public class RecentOrderDto
{
    public int OrderId { get; set; }
    public decimal Total { get; set; }
    public DateTime Date { get; set; }
}
}