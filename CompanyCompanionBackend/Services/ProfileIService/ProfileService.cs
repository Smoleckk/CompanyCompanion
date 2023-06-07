using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.Profile;
using CompanyCompanionBackend.Models.ServiceResponseModel;
using CompanyCompanionBackend.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CompanyCompanionBackend.Services.ProfileIService
{
    public class ProfileService :IProfileService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ProfileService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceResponse<UserProfile>> GetProfile(User user)
        {
            var response = new ServiceResponse<UserProfile>();

            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found.";
                return response;
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
            response.Data = profile;
            return response;
        }
        public async Task<ServiceResponse<Company>> UpdateTemplate(Company company,string template)
        {
            var response = new ServiceResponse<Company>();
            company.Template = template;
            await _context.SaveChangesAsync();
            response.Data = company;
            return response;
        }

    }
}
