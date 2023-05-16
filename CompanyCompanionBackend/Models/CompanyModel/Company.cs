using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCorrectModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.ProformaModel;
using CompanyCompanionBackend.Models.UserModel;

namespace CompanyCompanionBackend.Models.CompanyModel
{
    public class Company
    {
        public int CompanyId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Nip { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string CityCode { get; set; } = string.Empty;
        public string Template { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public ICollection<User> Users { get; set; }
        public ICollection<Invoice> Invoices { get; set; }
        public ICollection<InvoiceCorrect> InvoicesCorrect { get; set; }
        public ICollection<Proforma> Proformas { get; set; }
        public ICollection<Customer> Customers { get; set; }
        public ICollection<ProductMagazine> ProductMagazines { get; set; }
        public ICollection<InvoiceCount> InvoiceCounts { get; set; }
        public ICollection<ProformaCount> ProformaCounts { get; set; }
    }
}
