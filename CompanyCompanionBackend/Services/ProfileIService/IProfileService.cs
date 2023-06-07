using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.Profile;
using CompanyCompanionBackend.Models.ServiceResponseModel;
using CompanyCompanionBackend.Models.UserModel;

namespace CompanyCompanionBackend.Services.ProfileIService
{
    public interface IProfileService
    {
        Task<ServiceResponse<UserProfile>> GetProfile(User user);
        Task<ServiceResponse<Company>> UpdateTemplate(Company company, string template);

    }
}
