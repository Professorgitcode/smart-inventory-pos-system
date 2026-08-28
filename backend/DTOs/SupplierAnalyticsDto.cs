using System.Collections.Generic;

namespace backend.DTOs
{
    public class SupplierAnalyticsDto
    {
        public int ActiveSuppliers { get; set; }

        public decimal AverageRating { get; set; }

        public double AverageLeadTime { get; set; }

        public decimal AverageDelivery { get; set; }

        public List<SupplierPerformanceDto> PerformanceTrend { get; set; }

        public List<SupplierHealthDto> HealthBreakdown { get; set;
 }
        public SupplierDto TopSupplier { get; set; }

        public List<SupplierDto> HighRiskSuppliers { get; set; }
    }
}