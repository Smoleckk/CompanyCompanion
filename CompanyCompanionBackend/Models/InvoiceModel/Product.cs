namespace CompanyCompanionBackend.Models.InvoiceModel
{
    public class Product
    {
        public int ProductId { get; set; } = 0;
        public string ProductCode { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public double Qty { get; set; }
        public string Unit { get; set; }
        public double SalesPrice { get; set; }
        public double Vat { get; set; }
        public double BruttoPrice { get; set; }
        public double NettoPrice { get; set; }
    }
}
