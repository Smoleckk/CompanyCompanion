using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Services.AuthIService;
using CompanyCompanionBackend.Services.CustomerIService;
using CompanyCompanionBackend.Services.InvoiceCorrectIService;
using CompanyCompanionBackend.Services.InvoiceIService;
using CompanyCompanionBackend.Services.ProductMagazinesService;
using CompanyCompanionBackend.Services.ProfileIService;
using CompanyCompanionBackend.Services.ProformaIService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "oauth2",
        new OpenApiSecurityScheme
        {
            Description =
                "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
            In = ParameterLocation.Header,
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey
        }
    );

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)
            ),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddCors(
    options =>
        options.AddPolicy(
            name: "CompanyCompanion",
            policy =>
            {
                policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
            }
        )
);

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ICustomerService,CustomerService>();
builder.Services.AddScoped<IInvoiceService,InvoiceService>();
builder.Services.AddScoped<IPoducctMagazinesService, PoducctMagazinesService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IInvoiceCorrectService, InvoiceCorrectService>();
builder.Services.AddScoped<IProformaService, ProformaService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CompanyCompanion");
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
