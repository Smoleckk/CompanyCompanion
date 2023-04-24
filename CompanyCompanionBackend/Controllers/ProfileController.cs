using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.Profile;
using CompanyCompanionBackend.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ProfileController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<UserProfile>> GetProfile()
        {
            var user = await GetCompany();
            if (user == null)
            {
                return NotFound("user not found.");
            }
            UserProfile profile = new UserProfile
            {
                Username = user.Username,
                Email = user.Email,
                Name = user.Company.Name,
                Nip = user.Company.Nip,
                City = user.Company.City,
                CityCode = user.Company.CityCode,
            };

            return Ok(profile);
        }

        private async Task<User> GetCompany()
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users
                .Include(c => c.Company)
                .FirstOrDefaultAsync(c => c.Username == userName);
            return user;
        }
    }
}
