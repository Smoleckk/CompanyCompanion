using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models;
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
        // GET: api/productmagazines
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<ProductMagazine>>> GetProductMagazines()
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users.Include(c => c.Company).FirstOrDefaultAsync(c => c.Username == userName);
            var company = await _context.Companies.Include(i => i.ProductMagazines).FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            return Ok(company.ProductMagazines);
        }

        // GET: api/productmagazines/5
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

        // POST: api/productmagazines
        [HttpPost, Authorize]
        public async Task<ActionResult<ProductMagazine>> PostProductMagazine(ProductMagazineAddDto productMagazineAddDto)
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users.Include(c => c.Company).FirstOrDefaultAsync(c => c.Username == userName);
            Company company = await _context.Companies.Include(i => i.ProductMagazines).FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            var productMagazine = _mapper.Map<ProductMagazine>(productMagazineAddDto);
            company.ProductMagazines.Add(productMagazine);
            await _context.SaveChangesAsync();

            return Ok(productMagazine);
        }

        // DELETE: api/productmagazines/5
        [HttpDelete("{id}")]
        public ActionResult<ProductMagazine> DeleteProductMagazine(string id)
        {
            var productMagazine = _context.ProductMagazines.Find(id);

            if (productMagazine == null)
            {
                return NotFound();
            }

            _context.ProductMagazines.Remove(productMagazine);
            _context.SaveChanges();

            return productMagazine;
        }
    }
}
