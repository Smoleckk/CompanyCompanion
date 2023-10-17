using BIRService;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CustomerModel;
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
        private IBIRSearchService _service;

        public CustomerController(DataContext context, ICustomerService customerService, IBIRSearchService birSearchService)
        {
            _customerService = customerService;
            _context = context;
            _service = birSearchService;

        }

        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<CustomerReturnDto>>> GetCustomers()
        {
            var user = await GetUserWithCompany();
            var response = await _customerService.GetCustomers(user);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerReturnDto>> GetCustomer(int id)
        {
            var response = await _customerService.GetCustomer(id);
            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<Customer>> PostCustomer(CustomerAddDto customerAddDto)
        {
            var user = await GetUserWithCompany();
            var response = await _customerService.PostCustomer(user, customerAddDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CustomerAddDto>> UpdateCustomer(int id, CustomerAddDto customerAddDto)
        {
            var response = await _customerService.UpdateCustomer(id, customerAddDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var response = await _customerService.DeleteCustomer(id);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }
        [HttpGet("regon/{nip}")]
        public async Task<IActionResult> GetRegon(string nip)
        {
            var actual = await _service.GetCompanyDataByNipIdAsync(nip);
            if (actual.Errors.Count > 0)
            {
                string errorLogs = "";
                foreach (var error in actual.Errors)
                {
                    errorLogs += error.ErrorMessagePl + " ";
                }
                return NotFound(errorLogs);
            }
            return Ok(actual);
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
