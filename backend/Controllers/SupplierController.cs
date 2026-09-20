using backend.DTOs;
using backend.Data;
using backend.Models;
using backend.Services;
using backend.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SupplierController : ControllerBase
    {
        private readonly SupplierService _service;

        private readonly AppDbContext _context;

        private readonly SupplierIntelligenceService _intelligence;

        public SupplierController(
            SupplierService service,
            AppDbContext context,
            SupplierIntelligenceService intelligence)
        {
            _service = service;
            _context = context;
            _intelligence = intelligence;
        }

        // =============================
        // GET ALL SUPPLIERS
        // =============================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var suppliers =
                await _context.Suppliers
                .Select(s => new SupplierDto
                {
                    SupplierId = s.SupplierId,

                    SupplierName = s.SupplierName,

                    ContactPerson = s.ContactPerson,

                    Email = s.Email,

                    Phone = s.Phone,

                    Rating = s.Rating,

                    OnTimeDeliveryRate =
                        s.OnTimeDeliveryRate,

                    AverageLeadTime =
                        s.AverageLeadTime,

                    TotalOrders =
                        s.TotalOrders,

                    Status = s.Status,

                    IntelligenceScore =
                        _intelligence.CalculateScore(s),

                    RiskLevel =
                        _intelligence.CalculateRisk(s)
                })
                .ToListAsync();

            return Ok(
    new ApiResponse<List<SupplierDto>>
    (
        true,
        "Suppliers loaded successfully",
        suppliers
    )
);
        }

        // =============================
        // CREATE SUPPLIER
        // =============================
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateSupplierDto dto)
        {
            var supplier =
                await _service.CreateSupplier(dto);

        return Ok(

new ApiResponse<Supplier>
(
    true,
    "Supplier created successfully",
    supplier
)
);

        }

        // =============================
        // DELETE SUPPLIER
        // =============================

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var supplier =
               await _context.Suppliers.FindAsync(id);

            if (supplier == null)
            return NotFound();

            _context.Suppliers.Remove(supplier);

                await _context.SaveChangesAsync();

            return Ok(

new ApiResponse<object>
(
    true,
    "Supplier deleted successfully",
    null
)

);
        }

[HttpPut("{id}")]
[Authorize(Roles = "Admin")]
public async Task<IActionResult> Update(int id, CreateSupplierDto dto)
{
    var supplier =
        await _context.Suppliers.FindAsync(id);

    if (supplier == null)
        return NotFound();

    supplier.SupplierName = dto.SupplierName;
    supplier.ContactPerson = dto.ContactPerson;
    supplier.Email = dto.Email;
    supplier.Phone = dto.Phone;

    await _context.SaveChangesAsync();

    var response = new SupplierDto
    {
        SupplierId = supplier.SupplierId,
        SupplierName = supplier.SupplierName,
        ContactPerson = supplier.ContactPerson,
        Email = supplier.Email,
        Phone = supplier.Phone,
        Rating = supplier.Rating,
        OnTimeDeliveryRate = supplier.OnTimeDeliveryRate,
        AverageLeadTime = supplier.AverageLeadTime,
        TotalOrders = supplier.TotalOrders,
        Status = supplier.Status,
        IntelligenceScore =
            _intelligence.CalculateScore(supplier),
        RiskLevel =
            _intelligence.CalculateRisk(supplier)
    };

    return Ok(
        new ApiResponse<SupplierDto>(
            true,
            "Supplier updated successfully",
            response
        )
    );
}

        // =============================
        // ANALYTICS
        // =============================
       [HttpGet("analytics")]
public async Task<IActionResult> GetAnalytics()
{
    var analytics =
        await _service.GetAnalytics();

   return Ok(

new ApiResponse<SupplierAnalyticsDto>
(
    true,
    "Analytics loaded successfully",
    analytics
)

);
}
    }
}