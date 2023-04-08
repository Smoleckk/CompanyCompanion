using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public InvoiceController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }



        [HttpGet("get-invoices-header")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeader()
        {
            var company = await GetCompany();
            return Ok(company.Invoices);
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<InvoiceReturnDto>> GetInvoiceByCode(string code)
        {
            var invoice = await _context.Invoices.Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.InvoiceId == int.Parse(code));

            if (invoice == null)
            {
                return NotFound("Invoice not found.");
            }

            var invoiceReturnDto = _mapper.Map<InvoiceReturnDto>(invoice);

            return Ok(invoiceReturnDto);
        }

        [HttpPost("save-invoice")]
        [Authorize]
        public async Task<ActionResult<Invoice>> SaveInvoice(InvoiceAddDto invoiceAddDto)
        {
            var rnd = new Random();

            if (invoiceAddDto.IsGenerated)
            {
                invoiceAddDto.InvoiceNo = "No" + rnd.Next();
            }

            var invoice = _mapper.Map<Invoice>(invoiceAddDto);

            invoice.Company = await GetCompany();

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(invoice);
        }

        [HttpDelete("{code}")]
        public async Task<ActionResult<string>> DeleteInvoice(string code)
        {
            var invoice = await _context.Invoices.Include(c => c.Products)
                .FirstOrDefaultAsync(x => x.InvoiceId == int.Parse(code));

            if (invoice == null)
            {
                return NotFound("Invoice not found");
            }

            foreach (var product in invoice.Products)
            {
                _context.Products.Remove(product);
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return Ok(code);
        }

        [HttpPut("invoices/{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromBody] InvoiceAddDto invoiceDto)
        {
            Invoice invoice = await _context.Invoices.Include(i => i.Products)
                .SingleOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
            {
                return NotFound();
            }

            var rnd = new Random();
            if (invoiceDto.IsGenerated)
            {
                invoiceDto.InvoiceNo = "No" + rnd.Next();
            }

            // update invoice properties
            _mapper.Map(invoiceDto, invoice);

            // remove products not present in the DTO
            var productsToRemove = invoice.Products
                .Where(p => !invoiceDto.Products.Any(pd => pd.ProductId == p.ProductId))
                .ToList();
            _context.RemoveRange(productsToRemove);

            // update existing products or add new ones
            foreach (var productDto in invoiceDto.Products)
            {
                var product = invoice.Products.FirstOrDefault(p => p.ProductId == productDto.ProductId);

                if (product != null)
                {
                    _mapper.Map(productDto, product);
                }
                else
                {
                    invoice.Products.Add(_mapper.Map<Product>(productDto));
                }
            }

            await _context.SaveChangesAsync();

            return Ok(invoice);
        }

        private async Task<Company> GetCompany()
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users.Include(c => c.Company)
                .FirstOrDefaultAsync(c => c.Username == userName);
            var company = await _context.Companies.Include(i => i.Invoices)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            return company;
        }

    }
}
