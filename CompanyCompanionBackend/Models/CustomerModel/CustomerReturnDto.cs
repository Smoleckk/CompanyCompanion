using CompanyCompanionBackend.Models.InvoiceModel;

namespace CompanyCompanionBackend.Models.CustomerModel
{
    public class CustomerReturnDto
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerNip { get; set; } = string.Empty;
        public string CustomerCity { get; set; } = string.Empty;
        public string CustomerAddress { get; set; } = string.Empty;
        //public ICollection<Invoice> Invoices { get; set; }

    }
}
