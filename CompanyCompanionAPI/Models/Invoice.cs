namespace CompanyCompanionAPI.Models
{
    public class Invoice
    {
        public string InvoiceNo { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; } = DateTime.Now;
        public string CustomerId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string DeliveryAddress { get; set; } = string.Empty;
        public string Remarks { get; set; } = string.Empty;
        public double Total { get; set; }
        public double Tax { get; set; }
        public double NetTotal { get; set; }
        public string CreateUser { get; set; } = string.Empty;
        public string CreateDate { get; set; } = string.Empty;
        public List<InvoiceProduct> Products { get; set; } = new List<InvoiceProduct>();

    }
}
