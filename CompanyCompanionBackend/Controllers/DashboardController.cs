using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.Charts;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public DashboardController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("invoice-paid-status")]
        [Authorize]
        public async Task<ActionResult<List<InvoiceChart>>> GetInvoicePaidStatus()
        {
            var company = await GetCompany();

            var invoiceGroups = company.Invoices.Where(i => i.IsGenerated == true)
                .GroupBy(i => new { i.PaymentStatus })
                .Select(g => new InvoiceChart
                {
                    InvoiceChartName = g.Key.PaymentStatus,
                    InvoiceChartSum = g.Count()
                })
                .ToList();

            return Ok(invoiceGroups);
        }
        [HttpGet("invoice-paid-total-status")]
        [Authorize]
        public async Task<ActionResult<List<InvoiceChart>>> GetInvoicePaidTotalStatus()
        {
            var company = await GetCompany();

            var invoiceGroups = company.Invoices.Where(i => i.IsGenerated == true)
                .GroupBy(i => new { i.PaymentStatus })
                .Select(g => new InvoiceChart
                {
                    InvoiceChartName = g.Key.PaymentStatus,
                    InvoiceChartSum = g.Sum(i => i.Total)
                })
                .ToList();

            return Ok(invoiceGroups);
        }
        [HttpGet("invoice-date-issued-status")]
        [Authorize]
        public async Task<ActionResult<List<InvoiceChart>>> GetInvoiceIssueDateStatus()
        {
            var company = await GetCompany();

            var invoiceGroups = company.Invoices.Where(i => i.IsGenerated == true)
                .GroupBy(i => new { i.DateIssued })
                .Select(g => new InvoiceChart
                {
                    InvoiceChartName = g.Key.DateIssued,
                    InvoiceChartSum = g.Count()
                }).OrderByDescending(p => p.InvoiceChartName)
                .ToList();

            return Ok(invoiceGroups);
        }
        [HttpGet("invoice-number-customer-status")]
        [Authorize]
        public async Task<ActionResult<List<InvoiceChart>>> GetInvoiceNumberCustomerStatus()
        {
            var company = await GetCompany();

            var invoiceGroups = company.Invoices.Where(i => i.IsGenerated == true)
                .GroupBy(i => new { i.CustomerName })
                .Select(g => new InvoiceChart
                {
                    InvoiceChartName = g.Key.CustomerName,
                    InvoiceChartSum = g.Count()
                }).OrderByDescending(p => p.InvoiceChartSum)
                .ToList();

            return Ok(invoiceGroups);
        }
        [HttpGet("product-status")]
        [Authorize]
        public async Task<ActionResult<List<ProductChart>>> GetProductStatus()
        {
            var company = await GetCompany();

            List<Product> soldProduct = new List<Product>();
            var invoices = await _context.Invoices.Where(i => i.IsGenerated == true).ToListAsync();

            foreach (var invoice in invoices)
            {
                var invo = await _context.Invoices
                    .Include(i => i.Products)
                    .FirstOrDefaultAsync(i => i.InvoiceId == invoice.InvoiceId);
                soldProduct.AddRange(invo.Products);
            }

            List<ProductChart> productCharts = soldProduct
                .GroupBy(p => p.ProductName)
                .Select(g => new ProductChart
                {
                    ProductChartName = g.Key,
                    ProductChartSum = g.Sum(p => (int)p.Qty)
                })
                 .OrderByDescending(p => p.ProductChartSum)
    .ToList();

            return Ok(productCharts);
        }



        private async Task<Company> GetCompany()
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users
                .Include(c => c.Company)
                .FirstOrDefaultAsync(c => c.Username == userName);
            var company = await _context.Companies
                .Include(i => i.Invoices)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            return company;
        }
    }
}
