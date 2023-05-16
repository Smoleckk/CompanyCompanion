using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCorrectModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceCorrectController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public InvoiceCorrectController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }



        [HttpGet("get-invoices-header")]
        [Authorize]
        public async Task<ActionResult<List<InvoiceCorrect>>> GetInvoicesHeader()
        {
            var company = await GetCompany();
            return Ok(company.InvoicesCorrect);
        }

        [HttpGet("get-invoices-header/{code}")]
        [Authorize]
        public async Task<ActionResult<List<InvoiceCorrect>>> GetCustomerInvoicesHeader(string code)
        {
            var company = await GetCompany();
            return Ok(company.InvoicesCorrect.Where(i => i.CustomerName == code));
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<InvoiceCorrectReturnDto>> GetInvoiceByCode(string code)
        {
            var invoice = await _context.InvoicesCorrect
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.InvoiceCorrectId == int.Parse(code));

            if (invoice == null)
            {
                return NotFound("Invoices Correct not found.");
            }

            var invoiceReturnDto = _mapper.Map<InvoiceCorrectReturnDto>(invoice);

            return Ok(invoiceReturnDto);
        }

        [HttpPost("save-invoice")]
        [Authorize]
        public async Task<ActionResult<InvoiceCorrect>> SaveInvoice(InvoiceCorrectAddDto invoiceAddDto)
        {
            var company = await GetCompany();

            var invoiceCount = company.InvoiceCounts.FirstOrDefault(i => i.DateIssued == invoiceAddDto.DateIssued.Substring(0, 7) && i.Name == "Correct");
            if (invoiceAddDto.IsGenerated)
            {


                if (invoiceCount != null)
                {
                    invoiceCount.InvoiceNumber++;
                    invoiceAddDto.InvoiceCorrectNo = invoiceCount.InvoiceNumber.ToString() + "/COR" + invoiceAddDto.DateIssued.Substring(5, 2) + "/" + invoiceAddDto.DateIssued.Substring(0, 4);

                }
                else
                {
                    var n = new InvoiceCount { Name = "Correct", DateIssued = invoiceAddDto.DateIssued.Substring(0, 7), InvoiceNumber = 1 };
                    company.InvoiceCounts.Add(n);
                    invoiceAddDto.InvoiceCorrectNo = n.InvoiceNumber.ToString() + "/COR" + n.DateIssued.Substring(5, 2) + "/" + n.DateIssued.Substring(0, 4);

                }
            }
            else
            {
                invoiceAddDto.InvoiceCorrectNo = "Temp/COR/" + invoiceAddDto.DateIssued.Substring(5, 2) + "/" + invoiceAddDto.DateIssued.Substring(0, 4);
            }

            Customer customer = await _context.Customers.Include(i => i.InvoicesCorrect).FirstOrDefaultAsync(c => c.CustomerName == invoiceAddDto.CustomerName);
            invoiceAddDto.DateIssued = invoiceAddDto.DateIssued.Substring(0, 10);
            invoiceAddDto.DueDate = invoiceAddDto.DueDate.Substring(0, 10);
            var invoice = _mapper.Map<InvoiceCorrect>(invoiceAddDto);

            invoice.Company = await GetCompany();
            customer.InvoicesCorrect.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(invoice);
        }


        [HttpDelete("{code}")]
        public async Task<ActionResult<string>> DeleteInvoice(string code)
        {
            var invoice = await _context.InvoicesCorrect
            .Include(c => c.Products)
                .FirstOrDefaultAsync(x => x.InvoiceCorrectId == int.Parse(code));

            if (invoice == null)
            {
                return NotFound("InvoicesCorrect not found");
            }

            foreach (var product in invoice.Products)
            {
                _context.Products.Remove(product);
            }

            _context.InvoicesCorrect.Remove(invoice);
            await _context.SaveChangesAsync();

            return Ok(code);
        }

        [HttpPut("invoices/{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromBody] InvoiceCorrectAddDto invoiceDto)
        {
            InvoiceCorrect invoice = await _context.InvoicesCorrect
                .Include(i => i.Products)
                .SingleOrDefaultAsync(i => i.InvoiceCorrectId == id);

            if (invoice == null)
            {
                return NotFound();
            }
            var company = await GetCompany();

            if (invoice.IsGenerated == false && invoiceDto.IsGenerated == true)
            {
                var invoiceCount = company.InvoiceCounts.FirstOrDefault(i => i.DateIssued == invoiceDto.DateIssued.Substring(0, 7) && i.Name == "Correct");

                if (invoiceCount != null)
                {
                    invoiceCount.InvoiceNumber++;
                    invoiceDto.InvoiceCorrectNo = invoiceCount.InvoiceNumber.ToString() + "/COR/" + invoiceDto.DateIssued.Substring(5, 2) + "/" + invoiceDto.DateIssued.Substring(0, 4);


                }
                else
                {
                    var n = new InvoiceCount { DateIssued = invoiceDto.DateIssued.Substring(0, 7), InvoiceNumber = 1 };
                    company.InvoiceCounts.Add(n);
                    invoiceDto.InvoiceCorrectNo = n.InvoiceNumber.ToString() + "/COR/" + n.DateIssued.Substring(5, 2) + "/" + n.DateIssued.Substring(0, 4);


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
                .Include(i => i.InvoicesCorrect).Include(e => e.InvoiceCounts)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            return company;
        }
    }
}
