using backend.Models;
using QuestPDF.Fluent;

namespace backend.Services.Reports.Exports.Pdf
{
    public class SalesReportPdfExporter
    {
        public byte[] Export(
            IReadOnlyList<Order> orders)
        {
            var document =
                new SalesReportDocument(orders);

            return document.GeneratePdf();
        }
    }
}