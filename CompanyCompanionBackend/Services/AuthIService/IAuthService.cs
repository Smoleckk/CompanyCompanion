using CompanyCompanionBackend.Models.UserModel.Auth;
using CompanyCompanionBackend.Models.UserModel;
using Microsoft.AspNetCore.Mvc;

namespace CompanyCompanionBackend.Services.AuthIService
{
    public interface IAuthService
    {
        Task<User> Register(UserRegisterDto request);
        Task<TokenResponse> Login(UserLogin request);
    }
}
