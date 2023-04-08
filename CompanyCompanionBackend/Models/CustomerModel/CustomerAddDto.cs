namespace CompanyCompanionBackend.Models.CustomerModel
{
    public class CustomerAddDto
    {
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerNip { get; set; } = string.Empty;
        public string CustomerCity { get; set; } = string.Empty;
        public string CustomerAddress { get; set; } = string.Empty;
        public DateTime CustomerCreatedDate { get; set; } = DateTime.Now;
    }
}
