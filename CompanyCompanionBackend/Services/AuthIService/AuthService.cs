using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.UserModel.Auth;
using CompanyCompanionBackend.Models.UserModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CompanyCompanionBackend.Services.AuthIService
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration configuration;
        private readonly DataContext context;

        public AuthService(IConfiguration configuration, DataContext context)
        {
            this.configuration = configuration;
            this.context = context;
        }

        public async Task<User> Register(UserRegisterDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            User user = new User();
            user.Username = request.Username;
            user.Email = request.Email;
            user.Role = "Admin";
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            Company company = new Company
            {
                Name = request.Name,
                Nip = request.Nip,
                City = request.City,
                CityCode = request.CityCode,
                Template = request.Template,
            };
            user.Company = company;

            context.Companies.Add(company);
            context.Users.Add(user);
            context.SaveChanges();

            return user;
        }

        public async Task<TokenResponse> Login(UserLogin request)
        {
            var findUser = context.Users.FirstOrDefault(c => c.Username == request.Username);
            if (findUser == null)
            {
                return new TokenResponse { jwtToken = "User not found" };;
            }
            if (!VerifyPasswordHash(request.Password, findUser.PasswordHash, findUser.PasswordSalt))
            {
                return new TokenResponse { jwtToken = "Wrong password." };
            }
            string token = CreateToken(findUser);
            TokenResponse tokenResponse = new TokenResponse { jwtToken = token };

            return new TokenResponse { jwtToken = token }; 
            
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(
            string password,
            out byte[] passwordHash,
            out byte[] passwordSalt
        )
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return passwordHash.SequenceEqual(passwordHash);
            }
        }
    }
}
