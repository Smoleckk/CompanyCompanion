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
            var user = await GetUser();
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
                Template = user.Company.Template
            };

            return Ok(profile);
        }
        [HttpPut("{template}"), Authorize]
        public async Task<ActionResult<Company>> UpdateTemplate(string template)
        {
            var user = await GetUser();

            if (user == null)
            {
                return NotFound("user not found.");
            }
            var company = await GetCompany(user);

            company.Template = template;
            await _context.SaveChangesAsync();
            return Ok(company);
        }

        private async Task<User> GetUser()
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users
                .Include(c => c.Company)
                .FirstOrDefaultAsync(c => c.Username == userName);
            return user;
        }
        private async Task<Company> GetCompany(User user)
        {
            return await _context.Companies
                .Include(i => i.ProductMagazines)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
        }

    }
}
