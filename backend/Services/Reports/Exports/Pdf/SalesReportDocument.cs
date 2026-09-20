using backend.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace backend.Services.Reports.Exports.Pdf
{
    public class SalesReportDocument : IDocument
    {
        private readonly IReadOnlyList<Order> _orders;

        public SalesReportDocument(
            IReadOnlyList<Order> orders)
        {
            _orders = orders;
        }

        public DocumentMetadata GetMetadata()
        {
            return DocumentMetadata.Default;
        }

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
            {
                page.Margin(30);

                // =====================================
                // HEADER
                // =====================================

                page.Header()
                    .Text("Sales Report")
                    .FontSize(20)
                    .Bold();

                // =====================================
                // CONTENT
                // =====================================

                page.Content()
                    .Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        // =====================================
                        // TABLE HEADER
                        // =====================================

                        table.Header(header =>
                        {
                            header.Cell()
                                .Text("Order ID")
                                .Bold();

                            header.Cell()
                                .Text("Date")
                                .Bold();

                            header.Cell()
                                .Text("Amount")
                                .Bold();
                        });

                        // =====================================
                        // TABLE DATA
                        // =====================================

                        foreach (var order in _orders)
                        {
                            table.Cell()
                                .Text(order.Id.ToString());

                            table.Cell()
                                .Text(
                                    order.CreatedAt
                                        .ToShortDateString()
                                );

                            table.Cell()
                                .Text(
                                    order.TotalAmount
                                        .ToString("C")
                                );
                        }
                    });

                // =====================================
                // FOOTER
                // =====================================

                page.Footer()
                    .AlignCenter()
                    .Text(text =>
                    {
                        text.Span("Page ");

                        text.CurrentPageNumber();

                        text.Span(" of ");

                        text.TotalPages();
                    });
            });
        }
    }
}