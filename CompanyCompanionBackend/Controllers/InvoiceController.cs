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
    public class InvoiceController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext context;

        public InvoiceController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            this.context = context;
        }


        [HttpGet("get-invoices-header"), Authorize]
        public async Task<ActionResult<List<Invoice>>> GetInvoicesHeader()
        {
            var userName = User?.Identity?.Name;
            var user = await context.Users.Include(c => c.Company).FirstOrDefaultAsync(c => c.Username == userName);
            var company = await context.Companies.Include(i => i.Invoices).FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);

            return Ok(company.Invoices);
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<InvoiceReturnDto>> GetInvoiceByCode(string code)
        {
            var invoice = context.Invoices.Include(c => c.Products).FirstOrDefault(c => c.InvoiceId == Int32.Parse(code));
            if (invoice == null)
            {
                return NotFound("Invoice not found.");
            }
            var invoiceReturnDto = _mapper.Map<InvoiceReturnDto>(invoice);

            return Ok(invoiceReturnDto);
        }

        [HttpPost("save-invoice"), Authorize]
        public async Task<ActionResult<string>> SaveInvoice(InvoiceAddDto invoiceAddDto)
        {
            Random rnd = new Random();
            if (invoiceAddDto.IsGenerated)
            {
                invoiceAddDto.InvoiceNo = "No" + rnd.Next();
            }
            Invoice invoice = _mapper.Map<Invoice>(invoiceAddDto);

            var userName = User?.Identity?.Name;
            var user = await context.Users.Include(c => c.Company).FirstOrDefaultAsync(c => c.Username == userName);
            var company = await context.Companies.FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);

            invoice.Company = company;

            context.Invoices.Add(invoice);
            context.SaveChanges();

            return Ok(invoice);
        }

        [HttpDelete("{code}")]
        public async Task<ActionResult<string>> DeleteInvoice(string code)
        {
            var invoice = await context.Invoices.Include(c => c.Products).FirstOrDefaultAsync(x => x.InvoiceId == Int32.Parse(code));
            if (invoice == null)
            {
                return NotFound("Invoice not found");
            }
            foreach (var product in invoice.Products)
            {
                context.Products.Remove(product);
            }
            context.Invoices.Remove(invoice);
            await context.SaveChangesAsync();

            return Ok(code);
        }
        [HttpGet, Authorize]
        public ActionResult<string> GetMe()
        {
            var userName = User?.Identity?.Name;
            var user = context.Users.Include(c => c.Company).FirstOrDefault(c => c.Username == userName);

            return Ok(user.Company.CompanyId);
        }
        [HttpPut("invoices/{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, [FromBody] InvoiceAddDto invoiceDto)
        {
            Invoice invoice = await context.Invoices.Include(i => i.Products)
                .SingleOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
            {
                return NotFound();
            }
            Random rnd = new Random();
            if (invoiceDto.IsGenerated)
            {
                invoiceDto.InvoiceNo = "No" + rnd.Next();
            }
            // update properties of invoice object with values from invoiceDto
            invoice.InvoiceNo = invoiceDto.InvoiceNo;
            invoice.PlaceOfIssue = invoiceDto.PlaceOfIssue;
            invoice.DateIssued = invoiceDto.DateIssued;
            invoice.DueDate = invoiceDto.DueDate;
            invoice.CustomerName = invoiceDto.CustomerName;
            invoice.CustomerNip = invoiceDto.CustomerNip;
            invoice.CustomerDeliveryAddress = invoiceDto.CustomerDeliveryAddress;
            invoice.CustomerCityCode = invoiceDto.CustomerCityCode;
            invoice.SellerId = invoiceDto.SellerId;
            invoice.SellerIdName = invoiceDto.SellerIdName;
            invoice.SellerNip = invoiceDto.SellerNip;
            invoice.CustomerDeliveryAddress = invoiceDto.CustomerDeliveryAddress;
            invoice.SellerCityCode = invoiceDto.SellerCityCode;
            invoice.Total = invoiceDto.Total;
            invoice.Tax = invoiceDto.Tax;
            invoice.NetTotal = invoiceDto.NetTotal;
            invoice.PaymentStatus = invoiceDto.PaymentStatus;
            invoice.PaymentType = invoiceDto.PaymentType;
            invoice.AccountNumber = invoiceDto.AccountNumber;
            invoice.PaymentDescription = invoiceDto.PaymentDescription;
            invoice.Remarks = invoiceDto.Remarks;
            invoice.IsGenerated = invoiceDto.IsGenerated;

            // update products associated with the invoice
            var productsToRemove = invoice.Products
                .Where(p => !invoiceDto.Products.Any(pd => pd.ProductId == p.ProductId))
                .ToList();

            context.RemoveRange(productsToRemove);

            foreach (var productDto in invoiceDto.Products)
            {
                var product = invoice.Products.FirstOrDefault(p => p.ProductId == productDto.ProductId);

                if (product != null)
                {
                    product.ProductId = productDto.ProductId;
                    product.ProductName = productDto.ProductName;
                    product.Qty = productDto.Qty;
                    product.Unit = productDto.Unit;
                    product.SalesPrice = productDto.SalesPrice;
                    product.Vat = productDto.Vat;
                    product.BruttoPrice = productDto.BruttoPrice;
                    product.NettoPrice = productDto.NettoPrice;
                }
                else
                {
                    invoice.Products.Add(new Product
                    {
                        ProductId = productDto.ProductId,
                        ProductName = productDto.ProductName,
                        Qty = productDto.Qty,
                        Unit = productDto.Unit,
                        SalesPrice = productDto.SalesPrice,
                        Vat = productDto.Vat,
                        BruttoPrice = productDto.BruttoPrice,
                        NettoPrice = productDto.NettoPrice
                    });
                }
            }

            await context.SaveChangesAsync();

            return Ok(invoice);
        }

    }
}
