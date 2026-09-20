using System.Globalization;
using backend.Models;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace backend.Services.Reports.Exports.Docx
{
    public class SalesReportDocxExporter
    {
        // =====================================
        // EXPORT SALES REPORT TO DOCX
        // =====================================
        public byte[] Export(
            IReadOnlyList<Order> orders)
        {
            using var stream =
                new MemoryStream();

            using (var document = WordprocessingDocument.Create(
                stream,
                WordprocessingDocumentType.Document))
            {
                var mainPart =
                    document.AddMainDocumentPart();
                mainPart.Document = new Document();
                var body =
                    mainPart.Document.AppendChild(new Body());

                // =====================================
                // REPORT TITLE
                // =====================================
                body.AppendChild(
                    new Paragraph(
                        new Run(
                            new RunProperties(
                                new Bold(),
                                new FontSize { Val = "36" }
                            ),
                            new Text("SALES REPORT")
                        )
                    )
                );

                body.AppendChild(new Paragraph());

                // =====================================
                // TABLE
                // =====================================
                var table = new Table();

                table.AppendChild(
                    new TableProperties(
                        new TableBorders(
                            new TopBorder { Val = BorderValues.Single, Size = 4 },
                            new BottomBorder { Val = BorderValues.Single, Size = 4 },
                            new LeftBorder { Val = BorderValues.Single, Size = 4 },
                            new RightBorder { Val = BorderValues.Single, Size = 4 },
                            new InsideHorizontalBorder { Val = BorderValues.Single, Size = 4 },
                            new InsideVerticalBorder { Val = BorderValues.Single, Size = 4 }
                        )
                    )
                );

                // =====================================
                // COLUMN HEADERS
                // =====================================
                var headerRow = new TableRow();
                headerRow.Append(
                    CreateHeaderCell("Order ID"),
                    CreateHeaderCell("Date"),
                    CreateHeaderCell("Amount")
                );
                table.Append(headerRow);

                // =====================================
                // ORDER DATA
                // =====================================
                foreach (var order in orders)
                {
                    var dataRow = new TableRow();
                    dataRow.Append(
                        CreateCell(order.Id.ToString()),
                        CreateCell(order.CreatedAt.ToString("yyyy-MM-dd")),
                        CreateCell(order.TotalAmount.ToString("C", CultureInfo.GetCultureInfo("en-US")))
                    );
                    table.Append(dataRow);
                }

                body.AppendChild(table);
                mainPart.Document.Save();
            }

            // =====================================
            // GENERATE FILE
            // =====================================
            return stream.ToArray();
        }

        private static TableCell CreateHeaderCell(string text)
        {
            return new TableCell(
                new Paragraph(
                    new Run(
                        new RunProperties(new Bold()),
                        new Text(text)
                    )
                )
            );
        }

        private static TableCell CreateCell(string text)
        {
            return new TableCell(
                new Paragraph(
                    new Run(new Text(text))
                )
            );
        }
    }
}
