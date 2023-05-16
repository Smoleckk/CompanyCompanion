namespace CompanyCompanionBackend.Models.InvoiceCorrectModel
{
    public class InvoiceCorrectHeader
    {
        public int InvoiceCorrectHeaderId { get; set; }
        public string InvoiceCorrectNo { get; set; } = string.Empty;
        public string DateIssued { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public double NetTotal { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public bool IsGenerated { get; set; } = false;
    }
}
