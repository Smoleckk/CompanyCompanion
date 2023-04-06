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
    public class CustomerController : ControllerBase
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CustomerController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _mapper = mapper;
        }

        // GET: api/customers
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {

            var userName = User?.Identity?.Name;
            var user = await _context.Users.Include(c => c.Company).FirstOrDefaultAsync(c => c.Username == userName);
            var company = await _context.Companies.Include(i => i.Customers).FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            var customers = company.Customers;
            return Ok(customers);
        }

        // GET: api/customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(string id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerName == id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // POST: api/customers
        [HttpPost, Authorize]
        public async Task<ActionResult<Customer>> PostCustomer(CustomerAddDto customerAddDto)
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users.Include(c => c.Company).FirstOrDefaultAsync(c => c.Username == userName);
            Company company = await _context.Companies.Include(i => i.Customers).FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            var customer = _mapper.Map<Customer>(customerAddDto);
            company.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(customer);
        }

        // DELETE: api/customers/5
        [HttpDelete("{id}")]
        public ActionResult<Customer> DeleteCustomer(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            _context.SaveChanges();

            return customer;
        }

    }
}
