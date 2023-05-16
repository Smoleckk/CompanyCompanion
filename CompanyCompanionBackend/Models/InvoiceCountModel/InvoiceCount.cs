namespace CompanyCompanionBackend.Models.InvoiceCountModel
{
    public class InvoiceCount
    {
        public int InvoiceCountId { get; set; }
        public string DateIssued { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int InvoiceNumber { get; set; }
    }
}
