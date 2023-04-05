using System.Text.Json.Serialization;

namespace CompanyCompanionBackend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [JsonIgnore]
        public Company Company { get; set; }
    }
}
