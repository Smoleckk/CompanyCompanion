namespace CompanyCompanionBackend.Models.UserModel.Auth
{
    public class UserRegisterDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Nip { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string CityCode { get; set; } = string.Empty;
    }
}
