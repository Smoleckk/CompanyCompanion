using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.Profile;
using CompanyCompanionBackend.Models.UserModel;
using CompanyCompanionBackend.Services.ProfileIService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private readonly DataContext _context;

        public ProfileController(IProfileService profileService, DataContext context)
        {
            _profileService = profileService;
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<UserProfile>> GetProfile()
        {
            var user = await GetUser();
            var response = await _profileService.GetProfile(user);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }
        [HttpPut("{template}"), Authorize]
        public async Task<ActionResult<Company>> UpdateTemplate(string template)
        {
            var user = await GetUser();

            if (user == null)
            {
                return NotFound("User not found.");
            }
            var company = await GetCompany(user);
            var response = await _profileService.UpdateTemplate(company,template);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
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
