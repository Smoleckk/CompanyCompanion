namespace CompanyCompanionBackend.Models.InvoiceModel
{
    public class InvoiceAddDto
    {
        public string InvoiceNo { get; set; } = string.Empty;
        public string PlaceOfIssue { get; set; } = string.Empty;
        public string DateIssued { get; set; } = string.Empty;
        public string DueDate { get; set; } = string.Empty;
        public string InvoiceDate { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerNip { get; set; } = string.Empty;
        public string CustomerDeliveryAddress { get; set; } = string.Empty;
        public string CustomerCityCode { get; set; } = string.Empty;
        public string SellerId { get; set; } = string.Empty;
        public string SellerIdName { get; set; } = string.Empty;
        public string SellerNip { get; set; } = string.Empty;
        public string SellerDeliveryAddress { get; set; } = string.Empty;
        public string SellerCityCode { get; set; } = string.Empty;
        public double Total { get; set; }
        public double Tax { get; set; }
        public double NetTotal { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public string PaymentType { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string PaymentDescription { get; set; } = string.Empty;
        public string Remarks { get; set; } = string.Empty;
        public List<Product> Products { get; set; } = new List<Product>();
        public bool IsGenerated { get; set; } = false;
    }
}
