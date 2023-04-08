using CompanyCompanionBackend.Models.InvoiceModel;

namespace CompanyCompanionBackend.Models.Proforma
{
    public class Proforma
    {
        public string ProformaId { get; set; } = Guid.NewGuid().ToString();
        public string ProformaNo { get; set; } = string.Empty;
        public string PlaceOfIssue { get; set; } = string.Empty;
        public string DateIssued { get; set; } = string.Empty;
        public string DueDate { get; set; } = string.Empty;
        public DateTime ProformaDate { get; set; } = DateTime.Now;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerNip { get; set; } = string.Empty;
        public string customerDeliveryAddress { get; set; } = string.Empty;
        public string CustomerCityCode { get; set; } = string.Empty;
        public string SellerId { get; set; } = string.Empty;
        public string SellerIdName { get; set; } = string.Empty;
        public string SellerNip { get; set; } = string.Empty;
        public string sellerDeliveryAddress { get; set; } = string.Empty;
        public string SellerCityCode { get; set; } = string.Empty;
        public double Total { get; set; }
        public double Tax { get; set; }
        public double NetTotal { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public string PaymentType { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string PaymentDescription { get; set; } = string.Empty;
        public string Remarks { get; set; } = string.Empty;
        public string CreateUser { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public bool IsGenerated { get; set; } = false;

        public List<Product> Products { get; set; } = new List<Product>();
    }
}
