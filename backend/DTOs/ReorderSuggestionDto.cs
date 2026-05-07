namespace backend.DTOs
{
    public class ReorderSuggestionDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public int CurrentStock { get; set; }

        public int SuggestedReorderQuantity { get; set; }

        public string Urgency { get; set; }
    }
}