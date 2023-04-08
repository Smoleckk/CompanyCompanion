namespace CompanyCompanionBackend.Models.ProdMagazine
{
    public class ProductMagazineAddDto
    {
        public string Name { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Vat { get; set; }
        public double Qty { get; set; }
        public string Unit { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Remarks { get; set; } = string.Empty;
    }
}
