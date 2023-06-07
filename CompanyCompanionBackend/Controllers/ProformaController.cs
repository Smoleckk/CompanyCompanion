using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ProformaModel;
using CompanyCompanionBackend.Services.ProformaIService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProformaController : ControllerBase
    {
        private readonly IProformaService _proformaService;
        private readonly DataContext _context;

        public ProformaController(IProformaService proformaService, DataContext context)
        {
            _proformaService = proformaService;
            _context = context;
        }

        [HttpGet("get-proformas-header")]
        public async Task<ActionResult<List<Proforma>>> GetProformasHeader()
        {
            var company = await GetCompany();
            var response = await _proformaService.GetProformasHeader(company);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpGet("get-proforma-header-by-code/{code}")]
        public async Task<ActionResult<ProformaHeader>> GetProformaHeaderByCode(int code)
        {
            var response = await _proformaService.GetProformaHeaderByCode( code);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpPost("save-proforma")]
        public async Task<ActionResult<ProformaHeader>> SaveProforma(ProformaAddDto proformaAddDto)
        {
            var company = await GetCompany();
            var response = await _proformaService.SaveProforma(company, proformaAddDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }


        [HttpPut("proformas/{id}")]
        public async Task<ActionResult<Proforma>> UpdateProforma(int id, [FromBody] ProformaAddDto proformaDto)
        {
            var company = await GetCompany();
            var response = await _proformaService.UpdateProforma(company, id, proformaDto);

            if (response.Success == false)
                return NotFound(response.Message);
            return Ok(response.Data);
        }

        [HttpDelete("{code}")]
        public async Task<ActionResult<Proforma>> DeleteProforma(string code)
        {
            var response = await _proformaService.DeleteProforma(code);

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
                .Include(i => i.Proformas).Include(e => e.ProformaCounts)
                .FirstOrDefaultAsync(c => c.CompanyId == user.Company.CompanyId);
            return company;
        }
    }
}
