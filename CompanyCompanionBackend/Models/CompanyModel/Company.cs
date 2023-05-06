using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.UserModel;
using CompanyCompanionBackend.Models.InvoiceModel;

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
        public ICollection<Customer> Customers { get; set; }
        public ICollection<ProductMagazine> ProductMagazines { get; set; }
    }
}
