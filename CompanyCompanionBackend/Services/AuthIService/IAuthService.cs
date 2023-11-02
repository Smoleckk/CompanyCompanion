using CompanyCompanionBackend.Models.ServiceResponseModel;
using CompanyCompanionBackend.Models.UserModel;
using CompanyCompanionBackend.Models.UserModel.Auth;

namespace CompanyCompanionBackend.Services.AuthIService
{
    public interface IAuthService
    {
        Task<UserReturnDto> Register(UserRegisterDto request);
        Task<ServiceResponse<TokenResponse>> Login(UserLogin request);
    }
}
