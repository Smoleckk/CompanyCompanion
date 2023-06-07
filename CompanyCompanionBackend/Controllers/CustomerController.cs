using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.UserModel;
using CompanyCompanionBackend.Services.CustomerIService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly DataContext _context;

        public CustomerController(DataContext context, ICustomerService customerService)
        {
            _customerService = customerService;
            _context = context;

        }

        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<CustomerReturnDto>>> GetCustomers()
        {
            var user = await GetUserWithCompany();
            var response = await _customerService.GetCustomers(user);

            if(response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerReturnDto>> GetCustomer(int id)
        {
            //Customer customer = await _context.Customers.Include(i => i.Invoices).FirstOrDefaultAsync(
            //    c => c.CustomerId == id
            //);
            var response = await _customerService.GetCustomer(id);
            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);

            //if (customer == null)
            //{
            //    return NotFound();
            //}
            //var customersReturn = _mapper.Map<CustomerReturnDto>(customer);
            //return Ok(customer);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<Customer>> PostCustomer(CustomerAddDto customerAddDto)
        {
            var user = await GetUserWithCompany();
            var response = await _customerService.PostCustomer(user, customerAddDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);

            //var user = await GetUserWithCompany();
            //Company company = user.Company;
            //var customer = _mapper.Map<Customer>(customerAddDto);
            //company.Customers.Add(customer);
            //await _context.SaveChangesAsync();

            //return Ok(customer);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CustomerAddDto>> UpdateCustomer(int id, CustomerAddDto customerAddDto)
        {
            var response = await _customerService.UpdateCustomer(id,customerAddDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
            //var customer = await _context.Customers.FirstOrDefaultAsync(
            //    c => c.CustomerId == id
            //);

            //if (customer == null)
            //{
            //    return NotFound();
            //}
            //customer.CustomerName = customerAddDto.CustomerName;
            //customer.CustomerNip = customerAddDto.CustomerNip;
            //customer.CustomerCity = customerAddDto.CustomerCity;
            //customer.CustomerAddress = customerAddDto.CustomerAddress;
            //await _context.SaveChangesAsync();
            //return Ok(customer);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var response = await _customerService.DeleteCustomer(id);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
            //var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);

            //if (customer == null)
            //{
            //    return NotFound();
            //}

            //_context.Customers.Remove(customer);
            //await _context.SaveChangesAsync();

            //return customer;
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
