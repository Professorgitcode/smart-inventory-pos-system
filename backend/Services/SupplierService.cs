using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class SupplierService
    {
        private readonly ISupplierRepository _repository;

        public SupplierService(ISupplierRepository repository)
{
    _repository = repository;
}

        public async Task<List<SupplierDto>> GetAllSuppliers()
        {
          var suppliers = await _repository.GetAllAsync();

return suppliers.Select(s => new SupplierDto
{
    SupplierId = s.SupplierId,
    SupplierName = s.SupplierName,
    ContactPerson = s.ContactPerson,
    Email = s.Email,
    Phone = s.Phone,
    Rating = s.Rating,
    OnTimeDeliveryRate = s.OnTimeDeliveryRate,
    AverageLeadTime = s.AverageLeadTime,
    TotalOrders = s.TotalOrders,
    Status = s.Status
}).ToList();
        }

        public async Task<SupplierAnalyticsDto> GetAnalytics()
{
   var suppliers = await _repository.GetAllAsync();

    var dto = new SupplierAnalyticsDto();

    dto.ActiveSuppliers = suppliers.Count;

    dto.AverageRating =
        suppliers.Any()
        ? suppliers.Average(x => x.Rating)
        : 0;

    dto.AverageLeadTime =
        suppliers.Any()
        ? suppliers.Average(x => x.AverageLeadTime)
        : 0;

    dto.AverageDelivery =
        suppliers.Any()
        ? suppliers.Average(x => x.OnTimeDeliveryRate)
        : 0;

    dto.PerformanceTrend =
        BuildPerformanceTrend(dto);

    dto.HealthBreakdown =
        BuildHealthBreakdown(dto);

    dto.TopSupplier =
        BuildTopSupplier(suppliers);

    dto.HighRiskSuppliers =
        BuildHighRiskSuppliers(suppliers);

    return dto;
}

private List<SupplierPerformanceDto>
BuildPerformanceTrend(
    SupplierAnalyticsDto dto)
{
    return new List<SupplierPerformanceDto>
    {
        new SupplierPerformanceDto
        {
            Month="Jan",
            Rating=dto.AverageRating-0.4m,
            Delivery=dto.AverageDelivery-7
        },

        new SupplierPerformanceDto
        {
            Month="Feb",
            Rating=dto.AverageRating-0.2m,
            Delivery=dto.AverageDelivery-4
        },

        new SupplierPerformanceDto
        {
            Month="Mar",
            Rating=dto.AverageRating-0.1m,
            Delivery=dto.AverageDelivery-2
        },

        new SupplierPerformanceDto
        {
            Month="Apr",
            Rating=dto.AverageRating,
            Delivery=dto.AverageDelivery
        },

        new SupplierPerformanceDto
        {
            Month="May",
            Rating=dto.AverageRating+0.1m,
            Delivery=dto.AverageDelivery+2
        },

        new SupplierPerformanceDto
        {
            Month="Jun",
            Rating=dto.AverageRating+0.2m,
            Delivery=dto.AverageDelivery+4
        }
    };
}

private List<SupplierHealthDto>
BuildHealthBreakdown(
    SupplierAnalyticsDto dto)
{
    var score =
        (int)Math.Round(
        (
            dto.AverageDelivery +
            dto.AverageRating * 10
        ) / 2);

    return new List<SupplierHealthDto>
    {
        new SupplierHealthDto
        {
            Name="Healthy",
            Value=score,
            Color="#34729C"
        },

        new SupplierHealthDto
        {
            Name="Remaining",
            Value=100-score,
            Color="#E5E7EB"
        }
    };
}

private SupplierDto?
BuildTopSupplier(
    List<Supplier> suppliers)
{
    var supplier =
        suppliers
        .OrderByDescending(x => x.Rating)
        .FirstOrDefault();

    if (supplier == null)
        return null;

    return new SupplierDto
    {
        SupplierId = supplier.SupplierId,
        SupplierName = supplier.SupplierName,
        ContactPerson = supplier.ContactPerson,
        Email = supplier.Email,
        Phone = supplier.Phone,
        Rating = supplier.Rating,
        OnTimeDeliveryRate =
            supplier.OnTimeDeliveryRate,
        AverageLeadTime =
            supplier.AverageLeadTime,
        TotalOrders =
            supplier.TotalOrders,
        Status =
            supplier.Status
    };
}

private List<SupplierDto>
BuildHighRiskSuppliers(
    List<Supplier> suppliers)
{
    return suppliers

        .Where(x => x.Rating < 3)

        .Select(x => new SupplierDto
        {
            SupplierId = x.SupplierId,
            SupplierName = x.SupplierName,
            ContactPerson = x.ContactPerson,
            Email = x.Email,
            Phone = x.Phone,
            Rating = x.Rating,
            OnTimeDeliveryRate =
                x.OnTimeDeliveryRate,
            AverageLeadTime =
                x.AverageLeadTime,
            TotalOrders =
                x.TotalOrders,
            Status =
                x.Status
        })

        .ToList();
}
        public async Task<Supplier> CreateSupplier(
            CreateSupplierDto dto)
        {
            var supplier = new Supplier
            {
                SupplierName = dto.SupplierName,
                ContactPerson = dto.ContactPerson,
                Email = dto.Email,
                Phone = dto.Phone,

                Rating = 0,
                OnTimeDeliveryRate = 0,
                AverageLeadTime = 0,
                TotalOrders = 0,

                Status = "Active"
            };

           await _repository.AddAsync(supplier);

            return supplier;
        }
    }
}