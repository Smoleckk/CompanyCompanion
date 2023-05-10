using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ProformaModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProformaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ProformaController(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("get-proformas-header")]
        public async Task<ActionResult<List<Proforma>>> GetProformasHeader()
        {
            var company = await GetCompany();
            return Ok(company.Proformas);
        }

        [HttpGet("get-proforma-header-by-code/{code}")]
        public async Task<ActionResult<ProformaHeader>> GetProformaHeaderByCode(int code)
        {
            var proforma = await _context.Proformas
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.ProformaId == code);

            if (proforma == null)
            {
                return NotFound("Proforma not found.");
            }

            var proformaReturnDo = _mapper.Map<ProformaReturnDto>(proforma);

            return Ok(proformaReturnDo);
        }

        [HttpPost("save-proforma")]
        public async Task<ActionResult<ProformaHeader>> SaveProforma(ProformaAddDto proformaAddDto)
        {
            var company = await GetCompany();

            var proformaCount = company.ProformaCounts.FirstOrDefault(i => i.DateIssued == proformaAddDto.DateIssued.Substring(0, 7));
            //Random rnd = new Random();

            if (proformaAddDto.IsGenerated)
            {
                //proformaAddDto.ProformaNo = "PNo" + rnd.Next();

                if (proformaCount != null)
                {
                    proformaCount.ProformaNumber++;
                    proformaAddDto.ProformaNo = proformaCount.ProformaNumber.ToString() + "/PROF/" + proformaAddDto.DateIssued.Substring(5, 2) + "/" + proformaAddDto.DateIssued.Substring(0, 4);

                }
                else
                {
                    var n = new ProformaCount { DateIssued = proformaAddDto.DateIssued.Substring(0, 7), ProformaNumber = 1 };
                    company.ProformaCounts.Add(n);
                    proformaAddDto.ProformaNo = n.ProformaNumber.ToString() + "/" + n.DateIssued.Substring(5, 2) + "/" + n.DateIssued.Substring(0, 4);

                }
            }
            else
            {
                proformaAddDto.ProformaNo = "Temp/" + proformaAddDto.DateIssued.Substring(5, 2) + "/" + proformaAddDto.DateIssued.Substring(0, 4);
            }

            Customer customer = await _context.Customers.Include(i => i.Proformas).FirstOrDefaultAsync(c => c.CustomerName == proformaAddDto.CustomerName);
            proformaAddDto.DateIssued = proformaAddDto.DateIssued.Substring(0, 10);
            proformaAddDto.DueDate = proformaAddDto.DueDate.Substring(0, 10);
            var proforma = _mapper.Map<Proforma>(proformaAddDto);

            proforma.Company = await GetCompany();
            customer.Proformas.Add(proforma);
            await _context.SaveChangesAsync();

            return Ok(proforma);
        }


        [HttpPut("proformas/{id}")]
        public async Task<IActionResult> UpdateProforma(int id, [FromBody] ProformaAddDto proformaDto)
        {
            Proforma proforma = await _context.Proformas
                .Include(i => i.Products)
                .SingleOrDefaultAsync(i => i.ProformaId == id);

            if (proforma == null)
            {
                return NotFound();
            }

            var company = await GetCompany();

            if (proforma.IsGenerated == false && proformaDto.IsGenerated == true)
            {
                var invoiceCount = company.InvoiceCounts.FirstOrDefault(i => i.DateIssued == proformaDto.DateIssued.Substring(0, 7));

                if (invoiceCount != null)
                {
                    invoiceCount.InvoiceNumber++;
                    proformaDto.ProformaNo = invoiceCount.InvoiceNumber.ToString() + "/" + proformaDto.DateIssued.Substring(5, 2) + "/" + proformaDto.DateIssued.Substring(0, 4);

                }
                else
                {
                    var n = new InvoiceCount { DateIssued = proformaDto.DateIssued.Substring(0, 7), InvoiceNumber = 1 };
                    company.InvoiceCounts.Add(n);
                    proformaDto.ProformaNo = n.InvoiceNumber.ToString() + "/" + n.DateIssued.Substring(5, 2) + "/" + n.DateIssued.Substring(0, 4);

                }
            }
            proformaDto.DateIssued = proformaDto.DateIssued.Substring(0, 10);
            proformaDto.DueDate = proformaDto.DueDate.Substring(0, 10);
            // update invoice properties
            _mapper.Map(proformaDto, proforma);

            // remove products not present in the DTO
            var productsToRemove = proforma.Products
                .Where(p => !proformaDto.Products.Any(pd => pd.ProductId == p.ProductId))
                .ToList();
            _context.RemoveRange(productsToRemove);

            // update existing products or add new ones
            foreach (var productDto in proformaDto.Products)
            {
                var product = proforma.Products.FirstOrDefault(
                    p => p.ProductId == productDto.ProductId
                );

                if (product != null)
                {
                    _mapper.Map(productDto, product);
                }
                else
                {
                    proforma.Products.Add(_mapper.Map<Product>(productDto));
                }
            }

            await _context.SaveChangesAsync();

            return Ok(proforma);
        }




        //[HttpPost("save-proforma")]
        //public ActionResult<ProformaHeader> SaveProforma(Proforma proforma)
        //{
        //    Random rnd = new Random();
        //    if (proforma.IsGenerated)
        //    {
        //        proforma.ProformaNo = "PNo" + rnd.Next();
        //    }
        //    ProformaHeader c = proformasHeader.Find(c => c.ProformaId == proforma.ProformaId);
        //    if (c != null)
        //    {
        //        proformasHeader.Remove(c);
        //    }
        //    ProformaHeader proformaHeader = new ProformaHeader
        //    {
        //        ProformaId = Guid.NewGuid().ToString(),
        //        ProformaNo = proforma.ProformaNo,
        //        PlaceOfIssue = proforma.PlaceOfIssue,
        //        DateIssued = proforma.DateIssued,
        //        DueDate = proforma.DueDate,
        //        IsGenerated = proforma.IsGenerated
        //    };
        //    proformasHeader.Add(proformaHeader);
        //    return Ok(proformasHeader);
        //}

        //[HttpDelete("delete-proforma")]
        //public ActionResult<List<ProformaHeader>> SaveProforma(string Code)
        //{
        //    proformasHeader.RemoveAll(x => x.ProformaId == Code);
        //    return Ok(proformasHeader);
        //}
        [HttpDelete("{code}")]
        public async Task<ActionResult<string>> DeleteProforma(string code)
        {
            var proforma = await _context.Proformas
                .Include(c => c.Products)
                .FirstOrDefaultAsync(x => x.ProformaId == int.Parse(code));

            if (proforma == null)
            {
                return NotFound("Invoice not found");
            }

            foreach (var product in proforma.Products)
            {
                _context.Products.Remove(product);
            }

            _context.Proformas.Remove(proforma);
            await _context.SaveChangesAsync();

            return Ok(code);
        }
        private async Task<Company> GetCompany()
        {
            var userName = User?.Identity?.Name;
            var user = await _context.Users
                .Include(c => c.Company)
                .FirstOrDefaultAsync(c => c.Username == userName);
            var company = await _context.Companies
                .Include(i => i.Proformas).Include(e => e.ProformaCounts)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            return company;
        }
    }
}
