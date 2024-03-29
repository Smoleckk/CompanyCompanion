﻿using CompanyCompanionBackend.Models.InvoiceCorrectModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ProformaModel;

namespace CompanyCompanionBackend.Models.CustomerModel
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerNip { get; set; } = string.Empty;
        public string CustomerCity { get; set; } = string.Empty;
        public string CustomerAddress { get; set; } = string.Empty;
        public DateTime CustomerCreatedDate { get; set; } = DateTime.Now;
        public ICollection<Invoice> Invoices { get; set; }
        public ICollection<InvoiceCorrect> InvoicesCorrect { get; set; }
        public ICollection<Proforma> Proformas { get; set; }
    }
}
