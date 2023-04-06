namespace CompanyCompanionBackend.Models
{
    public class InvoiceHeader
    {
        public int InvoiceHeaderId { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public string DateIssued { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public double NetTotal { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public bool IsGenerated { get; set; } = false;
    }
}
