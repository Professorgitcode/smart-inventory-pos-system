using backend.Models;

namespace backend.Services
{
    public class SupplierIntelligenceService
    {
        public decimal CalculateScore(Supplier supplier)
        {
            decimal score =
                (supplier.Rating * 20)
                +
                (supplier.OnTimeDeliveryRate * 0.5m)
                +
                (supplier.TotalOrders * 0.05m);

            if (score > 100)
                score = 100;

            return Math.Round(score, 2);
        }

        public string CalculateRisk(Supplier supplier)
        {
            if
            (
                supplier.OnTimeDeliveryRate < 70
                ||
                supplier.AverageLeadTime > 14
            )
            {
                return "High";
            }

            if
            (
                supplier.OnTimeDeliveryRate < 85
                ||
                supplier.AverageLeadTime > 7
            )
            {
                return "Medium";
            }

            return "Low";
        }
    }
}