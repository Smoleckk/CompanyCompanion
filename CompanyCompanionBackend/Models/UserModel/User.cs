using System.Text.Json.Serialization;
using CompanyCompanionBackend.Models.CompanyModel;

namespace CompanyCompanionBackend.Models.UserModel
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [JsonIgnore]
        public Company Company { get; set; }
    }
}
