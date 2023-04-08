using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.UserModel;
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
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<CustomerReturnDto>>> GetCustomers()
        {
            var user = await GetUserWithCompany();
            var customers = user.Company.Customers;

            var customersReturn = _mapper.Map<IEnumerable<CustomerReturnDto>>(customers);

            return Ok(customersReturn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerReturnDto>> GetCustomer(string id)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerName == id);

            if (customer == null)
            {
                return NotFound();
            }
            var customersReturn = _mapper.Map<CustomerReturnDto>(customer);
            return Ok(customer);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<Customer>> PostCustomer(CustomerAddDto customerAddDto)
        {
            var user = await GetUserWithCompany();
            Company company = user.Company;
            var customer = _mapper.Map<Customer>(customerAddDto);
            company.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(customer);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);

            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }
        private async Task<User> GetUserWithCompany()
        {
            var userName = User?.Identity?.Name;
            return await _context.Users
                .Include(c => c.Company)
                .ThenInclude(i => i.Customers)
                .FirstOrDefaultAsync(c => c.Username == userName);
        }

    }
}
