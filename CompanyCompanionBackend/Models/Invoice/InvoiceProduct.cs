namespace CompanyCompanionBackend.Models.Invoice
{
    public class InvoiceProduct
    {
        public string InvoiceNo { get; set; } = string.Empty;
        public string ProductCode { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public int Qty { get; set; }
        public int SalesPrice { get; set; }
        public int Total { get; set; }


    }
}
