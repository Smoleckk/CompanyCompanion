using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.ModelDto;
using CompanyCompanionBackend.Models;
using CompanyCompanionBackend.ModelsDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //public static User user = new User();
        private readonly IConfiguration configuration;
        private readonly DataContext context;

        public AuthController(IConfiguration configuration, DataContext context)
        {
            this.configuration = configuration;
            this.context = context;

        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegisterDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            User user = new User();
            user.Username = request.Username;
            user.Email = request.Email;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            Company company = new Company
            {
                Name = request.Name,
                Nip = request.Nip,
                City = request.City,
                CityCode = request.CityCode,
            };
            user.Company = company;

            context.Companies.Add(company);
            context.Users.Add(user);
            context.SaveChanges();

            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            var findUser = context.Users.FirstOrDefault(c => c.Username == request.Username);
            if (findUser == null)
            {
                return BadRequest("User not found.");
            }
            if (!VerifyPasswordHash(request.Password, findUser.PasswordHash, findUser.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }
            string token = CreateToken(findUser);
            TokenResponse tokenResponse = new TokenResponse
            {
                jwtToken = token,
            };

            return Ok(tokenResponse); ;
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.Role,"Admin")

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
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
