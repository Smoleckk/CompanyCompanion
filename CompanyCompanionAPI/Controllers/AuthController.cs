using CompanyCompanionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CompanyCompanionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly IConfiguration configuration;

        public AuthController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto request)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            user.Username = request.Username;
            user.PasswordHash = passwordHash;

            return Ok(user);
        }
        [HttpPost("login")]
        public ActionResult<string> Login(UserDto request)
        {
            if (user.Username != request.Username)
            {
                return BadRequest("User not found!");
            }
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Wrong password!");
            }
            string token = CreateToken(user);
            TokenResponse tokenResponse = new TokenResponse
            {
                jwtToken = token,
            };

            return Ok(tokenResponse);
        }

        [HttpGet("get-users"),Authorize]
        public ActionResult<List<User>> GetUsers()
        {
          List<User> users = new List<User>();
            users.Add(user);

            return Ok(users);
        }

        [HttpPut("update")]
        public ActionResult<string> UpdateUser(UserDto request)
        {
            if (user.Username != request.Username)
            {
                return BadRequest("User not found!");
            }


            return Ok();
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value!));
        
            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims:claims,
                expires:DateTime.Now.AddDays(1),
                signingCredentials:creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
