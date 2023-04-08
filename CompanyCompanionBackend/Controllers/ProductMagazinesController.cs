﻿using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductMagazinesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ProductMagazinesController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<ProductMagazine>>> GetProductMagazines()
        {
            var user = await GetUser();
            var company = await GetCompany(user);
            return Ok(company.ProductMagazines);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<ProductMagazine>> GetProductMagazine(string name)
        {
            var productMagazine = await _context.ProductMagazines.FirstOrDefaultAsync(c => c.Name == name);

            if (productMagazine == null)
            {
                return NotFound();
            }

            return Ok(productMagazine);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<ProductMagazine>> PostProductMagazine(ProductMagazineAddDto productMagazineAddDto)
        {
            var user = await GetUser();
            var company = await GetCompany(user);

            var productMagazine = _mapper.Map<ProductMagazine>(productMagazineAddDto);
            company.ProductMagazines.Add(productMagazine);
            await _context.SaveChangesAsync();

            return Ok(productMagazine);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductMagazine>> DeleteProductMagazine(string id)
        {
            var productMagazine = await _context.ProductMagazines.FindAsync(id);

            if (productMagazine == null)
            {
                return NotFound();
            }

            _context.ProductMagazines.Remove(productMagazine);
            await _context.SaveChangesAsync();

            return productMagazine;
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
