using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
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
        [HttpGet("get-invoices-header-paid")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeaderPaid()
        {
            var company = await GetCompany();
            return Ok(company.Invoices.Where(e => e.IsGenerated == true && e.PaymentStatus == "Paid"));

        }
        [HttpGet("get-invoices-header-delay")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeaderDelay()
        {
            var company = await GetCompany();
            return Ok(company.Invoices.Where(e => DateTime.Parse(e.DueDate) < DateTime.Today && e.PaymentStatus == "Unpaid" && e.IsGenerated == true));

        }

        [HttpGet("get-invoices-header-draft")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeaderDraft()
        {
            var company = await GetCompany();
            return Ok(company.Invoices.Where(e => e.IsGenerated == false));

        }
        [HttpGet("get-invoices-header/{code}")]
        [Authorize]
        public async Task<ActionResult<List<Invoice>>> GetCustomerInvoicesHeader(string code)
        {
            var company = await GetCompany();
            return Ok(company.Invoices.Where(i => i.CustomerName == code));
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<InvoiceReturnDto>> GetInvoiceByCode(string code)
        {
            var invoice = await _context.Invoices
                .Include(c => c.Products)
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
            var company = await GetCompany();

            var invoiceCount = company.InvoiceCounts.FirstOrDefault(i => i.DateIssued == invoiceAddDto.DateIssued.Substring(0, 7));
            if (invoiceAddDto.IsGenerated)
            {


                if (invoiceCount != null)
                {
                    invoiceCount.InvoiceNumber++;
                    invoiceAddDto.InvoiceNo = invoiceCount.InvoiceNumber.ToString() + "/" + invoiceAddDto.DateIssued.Substring(5, 2) + "/" + invoiceAddDto.DateIssued.Substring(0, 4);

                }
                else
                {
                    var n = new InvoiceCount { DateIssued = invoiceAddDto.DateIssued.Substring(0, 7), InvoiceNumber = 1 };
                    company.InvoiceCounts.Add(n);
                    invoiceAddDto.InvoiceNo = n.InvoiceNumber.ToString() + "/" + n.DateIssued.Substring(5, 2) + "/" + n.DateIssued.Substring(0, 4);

                }
            }
            else
            {
                invoiceAddDto.InvoiceNo = "Temp/" + invoiceAddDto.DateIssued.Substring(5, 2) + "/" + invoiceAddDto.DateIssued.Substring(0, 4);
            }

            Customer customer = await _context.Customers.Include(i => i.Invoices).FirstOrDefaultAsync(c => c.CustomerName == invoiceAddDto.CustomerName);
            invoiceAddDto.DateIssued = invoiceAddDto.DateIssued.Substring(0, 10);
            invoiceAddDto.DueDate = invoiceAddDto.DueDate.Substring(0, 10);
            var invoice = _mapper.Map<Invoice>(invoiceAddDto);

            invoice.Company = await GetCompany();
            customer.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(invoice);
        }


        [HttpDelete("{code}")]
        public async Task<ActionResult<string>> DeleteInvoice(string code)
        {
            var invoice = await _context.Invoices
                .Include(c => c.Products)
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
            Invoice invoice = await _context.Invoices
                .Include(i => i.Products)
                .SingleOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
            {
                return NotFound();
            }
            var company = await GetCompany();

            if (invoice.IsGenerated == false && invoiceDto.IsGenerated == true)
            {
                var invoiceCount = company.InvoiceCounts.FirstOrDefault(i => i.DateIssued == invoiceDto.DateIssued.Substring(0, 7));

                if (invoiceCount != null)
                {
                    invoiceCount.InvoiceNumber++;
                    invoiceDto.InvoiceNo = invoiceCount.InvoiceNumber.ToString() + "/" + invoiceDto.DateIssued.Substring(5, 2) + "/" + invoiceDto.DateIssued.Substring(0, 4);

                }
                else
                {
                    var n = new InvoiceCount { DateIssued = invoiceDto.DateIssued.Substring(0, 7), InvoiceNumber = 1 };
                    company.InvoiceCounts.Add(n);
                    invoiceDto.InvoiceNo = n.InvoiceNumber.ToString() + "/" + n.DateIssued.Substring(5, 2) + "/" + n.DateIssued.Substring(0, 4);

                }
            }
            invoiceDto.DateIssued = invoiceDto.DateIssued.Substring(0, 10);
            invoiceDto.DueDate = invoiceDto.DueDate.Substring(0, 10);
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
                var product = invoice.Products.FirstOrDefault(
                    p => p.ProductId == productDto.ProductId
                );

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
