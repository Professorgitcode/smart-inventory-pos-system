using backend.Models;
using System.Text;

namespace backend.Services.Reports.Exports.Csv
{
    public class SalesReportCsvExporter
    {
        // =====================================
        // EXPORT SALES REPORT TO CSV
        // =====================================

        public byte[] Export(
            IReadOnlyList<Order> orders)
        {
            var csv = new StringBuilder();

            // =====================================
            // CSV HEADER
            // =====================================

            csv.AppendLine(
                "OrderId,Date,Amount"
            );

            // =====================================
            // ORDER DATA
            // =====================================

            foreach (var order in orders)
            {
                csv.AppendLine(
                    $"{order.Id}," +
                    $"{order.CreatedAt:yyyy-MM-dd}," +
                    $"{order.TotalAmount:F2}"
                );
            }

            // =====================================
            // ENCODE CSV
            // =====================================

            return Encoding.UTF8.GetBytes(
                csv.ToString()
            );
        }
    }
}