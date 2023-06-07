using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.UserModel;
using CompanyCompanionBackend.Services.InvoiceIService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;
        private readonly DataContext _context;

        public InvoiceController(IInvoiceService invoiceService, DataContext context)
        {
            _invoiceService = invoiceService;
            _context = context;
        }



        [HttpGet("get-invoices-header")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeader()
        {
            var company = await GetCompany();
            var response = await _invoiceService.GetInvoicesHeader(company);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }
        [HttpGet("get-invoices-header-paid")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeaderPaid()
        {

            var company = await GetCompany();
            var response = await _invoiceService.GetInvoicesHeaderPaid(company);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);

        }
        [HttpGet("get-invoices-header-delay")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeaderDelay()
        {

            var company = await GetCompany();
            var response = await _invoiceService.GetInvoicesHeaderDelay(company);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);

        }

        [HttpGet("get-invoices-header-draft")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeaderDraft()
        {
            var company = await GetCompany();
            var response = await _invoiceService.GetInvoicesHeaderDraft(company);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);

        }
        [HttpGet("get-invoices-header/{code}")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetCustomerInvoicesHeader(string code)
        {
            var company = await GetCompany();
            var response = await _invoiceService.GetCustomerInvoicesHeader(company,code);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<InvoiceReturnDto>> GetInvoiceByCode(string code)
        {
            var response = await _invoiceService.GetInvoiceByCode(code);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpPost("save-invoice")]
        [Authorize]
        public async Task<ActionResult<Invoice>> SaveInvoice(InvoiceAddDto invoiceAddDto)
        {

            var company = await GetCompany();
            var response = await _invoiceService.SaveInvoice(company,invoiceAddDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }


        [HttpDelete("{code}")]
        public async Task<ActionResult<Invoice>> DeleteInvoice(string code)
        {
            var response = await _invoiceService.DeleteInvoice(code);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpPut("invoices/{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromBody] InvoiceAddDto invoiceDto)
        {
            var company = await GetCompany();
            var response = await _invoiceService.UpdateInvoice(company,id,invoiceDto);

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
                .Include(i => i.Invoices).Include(e => e.InvoiceCounts)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            return company;
        }
    }
}
