using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ProformaModel;
using CompanyCompanionBackend.Models.ServiceResponseModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Services.ProformaIService
{
    public class ProformaService : IProformaService
    {

        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ProformaService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceResponse<List<Proforma>>> GetProformasHeader(Company company)
        {
            var response = new ServiceResponse<List<Proforma>>();
            response.Data = company.Proformas.ToList();
            return response;
        }

        public async Task<ServiceResponse<ProformaReturnDto>> GetProformaHeaderByCode(int code)
        {
            var response = new ServiceResponse<ProformaReturnDto>();

            var proforma = await _context.Proformas
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.ProformaId == code);

            if (proforma == null)
            {
                response.Success = false;
                response.Message = "Proforma not found.";
                return response;
            }

            var proformaReturnDo = _mapper.Map<ProformaReturnDto>(proforma);
            response.Data = proformaReturnDo;
            return response;
        }

        public async Task<ServiceResponse<Proforma>> SaveProforma(Company company, ProformaAddDto proformaAddDto)
        {
            var response = new ServiceResponse<Proforma>();

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
                    proformaAddDto.ProformaNo = n.ProformaNumber.ToString() + "/PROF/" + n.DateIssued.Substring(5, 2) + "/" + n.DateIssued.Substring(0, 4);

                }
            }
            else
            {
                proformaAddDto.ProformaNo = "Temp/PROF/" + proformaAddDto.DateIssued.Substring(5, 2) + "/" + proformaAddDto.DateIssued.Substring(0, 4);
            }

            Customer customer = await _context.Customers.Include(i => i.Proformas).FirstOrDefaultAsync(c => c.CustomerName == proformaAddDto.CustomerName);
            proformaAddDto.DateIssued = proformaAddDto.DateIssued.Substring(0, 10);
            proformaAddDto.DueDate = proformaAddDto.DueDate.Substring(0, 10);
            var proforma = _mapper.Map<Proforma>(proformaAddDto);

            proforma.Company =company;
            customer.Proformas.Add(proforma);
            await _context.SaveChangesAsync();

            response.Data = proforma;
            return response;
        }


        public async Task<ServiceResponse<Proforma>> UpdateProforma(Company company, int id, ProformaAddDto proformaDto)
        {
            var response = new ServiceResponse<Proforma>();

            Proforma proforma = await _context.Proformas
                .Include(i => i.Products)
                .SingleOrDefaultAsync(i => i.ProformaId == id);

            if (proforma == null)
            {
                response.Success = false;
                response.Message = "Proforma not found.";
                return response;
            }

            if (proforma.IsGenerated == false && proformaDto.IsGenerated == true)
            {
                var invoiceCount = company.InvoiceCounts.FirstOrDefault(i => i.DateIssued == proformaDto.DateIssued.Substring(0, 7) && i.Name == "Proforma");

                if (invoiceCount != null)
                {
                    invoiceCount.InvoiceNumber++;
                    proformaDto.ProformaNo = invoiceCount.InvoiceNumber.ToString() + "/" + proformaDto.DateIssued.Substring(5, 2) + "/" + proformaDto.DateIssued.Substring(0, 4);

                }
                else
                {
                    var n = new InvoiceCount { Name="Proforma", DateIssued = proformaDto.DateIssued.Substring(0, 7), InvoiceNumber = 1 };
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
            response.Data = proforma;
            return response;
        }
        public async Task<ServiceResponse<Proforma>> DeleteProforma(string code)
        {
            var response = new ServiceResponse<Proforma>();

            var proforma = await _context.Proformas
                .Include(c => c.Products)
                .FirstOrDefaultAsync(x => x.ProformaId == int.Parse(code));

            if (proforma == null)
            {
                response.Success = false;
                response.Message = "Proforma not found.";
                return response;
            }

            foreach (var product in proforma.Products)
            {
                _context.Products.Remove(product);
            }

            _context.Proformas.Remove(proforma);
            await _context.SaveChangesAsync();

            response.Data = proforma; ;
            return response;
        }
    }
}
