using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCorrectModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Services.InvoiceCorrectIService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceCorrectController : ControllerBase
    {
        private readonly IInvoiceCorrectService _invoiceCorrectService;
        private readonly DataContext _context;

        public InvoiceCorrectController(IInvoiceCorrectService invoiceCorrectService, DataContext context)
        {
            _invoiceCorrectService = invoiceCorrectService;
            _context = context;
        }



        [HttpGet("get-invoices-header")]
        [Authorize]
        public async Task<ActionResult<List<InvoiceCorrect>>> GetInvoicesHeader()
        {
            var company = await GetCompany();
            var response = await _invoiceCorrectService.GetInvoicesHeader(company);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpGet("get-invoices-header/{code}")]
        [Authorize]
        public async Task<ActionResult<List<InvoiceCorrect>>> GetCustomerInvoicesHeader(string code)
        {
            var company = await GetCompany();
            var response = await _invoiceCorrectService.GetCustomerInvoicesHeader(company, code);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<InvoiceCorrectReturnDto>> GetInvoiceByCode(string code)
        {
            var response = await _invoiceCorrectService.GetInvoiceByCode(code);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpPost("save-invoice")]
        [Authorize]
        public async Task<ActionResult<InvoiceCorrect>> SaveInvoice(InvoiceCorrectAddDto invoiceAddDto)
        {
            var company = await GetCompany();
            var response = await _invoiceCorrectService.SaveInvoice(company, invoiceAddDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }


        [HttpDelete("{code}")]
        public async Task<ActionResult<InvoiceCorrect>> DeleteInvoice(string code)
        {
            var response = await _invoiceCorrectService.DeleteInvoice(code);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpPut("invoices/{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromBody] InvoiceCorrectAddDto invoiceDto)
        {
            var company = await GetCompany();
            var response = await _invoiceCorrectService.UpdateInvoice(company, id, invoiceDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        private async Task<Company> GetCompany()
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users
                .Include(c => c.Company)
                .FirstOrDefaultAsync(c => c.Username == userName);
            var company = await _context.Companies
                .Include(i => i.InvoicesCorrect).Include(e => e.InvoiceCounts)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            return company;
        }
    }
}
