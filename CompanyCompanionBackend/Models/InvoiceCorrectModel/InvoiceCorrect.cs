﻿using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using System.Text.Json.Serialization;

namespace CompanyCompanionBackend.Models.InvoiceCorrectModel
{
    public class InvoiceCorrect
    {
        public int InvoiceCorrectId { get; set; }
        public string InvoiceCorrectNo { get; set; } = string.Empty;
        public string InvoiceCorrectNoFrom { get; set; } = string.Empty;
        public string InvoiceDateCorrect { get; set; } = string.Empty;
        public string IssueCorrect { get; set; } = string.Empty;
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
        public double TotalCorrect { get; set; }
        public double TaxCorrect { get; set; }
        public double NetTotalCorrect { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public string PaymentType { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string PaymentDescription { get; set; } = string.Empty;
        public string Remarks { get; set; } = string.Empty;
        public string CreateUser { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public bool IsGenerated { get; set; } = false;
        public List<Product> Products { get; set; } = new List<Product>();
        //public List<ProductCorrect> ProductsCorrect { get; set; } = new List<ProductCorrect>();

        [JsonIgnore]
        public Company Company { get; set; }
    }
}
