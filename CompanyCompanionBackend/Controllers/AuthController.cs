﻿using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.UserModel;
using CompanyCompanionBackend.Models.UserModel.Auth;
using CompanyCompanionBackend.Services.AuthIService;
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
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService=authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserLogin request)
        {
            var response = await _authService.Login(request);
            //if (!response.Success)
            //{
            //    return BadRequest("Wrong Credentials");
            //}

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult<TokenResponse>> Register(UserRegisterDto request)
        {
            var response = await _authService.Register(request);
            //if (!response.Success)
            //{
            //    return BadRequest(response);
            //}

            return Ok(response);

        }


    }
}
