using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.UserModel;
using CompanyCompanionBackend.Services.ProductMagazinesService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductMagazinesController : ControllerBase
    {
        private readonly IPoducctMagazinesService _poducctMagazinesService;
        private readonly DataContext _context;

        public ProductMagazinesController(IPoducctMagazinesService poducctMagazinesService, DataContext context)
        {

            _poducctMagazinesService = poducctMagazinesService;
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<ProductMagazine>>> GetProductMagazines()
        {
            var user = await GetUser();
            var company = await GetCompany(user);
            var response = await _poducctMagazinesService.GetProductMagazines(company);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductMagazine>> GetProductMagazine(int id)
        {
            var response = await _poducctMagazinesService.GetProductMagazine(id);
            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }
        [HttpGet("name/{name}")]
        public async Task<ActionResult<ProductMagazine>> GetProductMagazineByName(string name)
        {
            var response = await _poducctMagazinesService.GetProductMagazineByName(name);
            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }
        [HttpPut]
        public async Task<ActionResult<ProductMagazine>> UpdateProductMagazine(ProductMagazine productUpdate)
        {
            var response = await _poducctMagazinesService.UpdateProductMagazine(productUpdate);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<ProductMagazine>> PostProductMagazine(
            ProductMagazineAddDto productMagazineAddDto
        )
        {
            var user = await GetUser();
            var company = await GetCompany(user);
            var response = await _poducctMagazinesService.PostProductMagazine(company, productMagazineAddDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductMagazine>> DeleteProductMagazine(int id)
        {
            var response = await _poducctMagazinesService.DeleteProductMagazine(id);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        private async Task<User> GetUser()
        {
            var userName = User?.Identity?.Name;
            return await _context.Users
                .Include(c => c.Company)
                .FirstOrDefaultAsync(c => c.Username == userName);
        }

        private async Task<Company> GetCompany(User user)
        {
            return await _context.Companies
                .Include(i => i.ProductMagazines)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
        }
    }
}
