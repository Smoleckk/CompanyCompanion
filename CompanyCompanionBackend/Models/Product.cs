namespace CompanyCompanionBackend.Models
{
    public class Product
    {
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Price { get; set; }
        public int Category { get; set; }
        public string Remarks { get; set; } = string.Empty;
    }
}
