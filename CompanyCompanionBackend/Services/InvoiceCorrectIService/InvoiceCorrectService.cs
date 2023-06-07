using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCorrectModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ServiceResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Services.InvoiceCorrectIService
{
    public class InvoiceCorrectService : IInvoiceCorrectService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public InvoiceCorrectService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }



        public async Task<ServiceResponse<List<InvoiceCorrect>>> GetInvoicesHeader(Company company)
        {
            var response = new ServiceResponse<List<InvoiceCorrect>>();
            response.Data = company.InvoicesCorrect.ToList();
            return response;
        }

        public async Task<ServiceResponse<List<InvoiceCorrect>>> GetCustomerInvoicesHeader(Company company, string code)
        {
            var response = new ServiceResponse<List<InvoiceCorrect>>();
            response.Data = company.InvoicesCorrect.Where(i => i.CustomerName == code).ToList();
            return response;
        }

        public async Task<ServiceResponse<InvoiceCorrectReturnDto>> GetInvoiceByCode(string code)
        {
            var response = new ServiceResponse<InvoiceCorrectReturnDto>();

            var invoice = await _context.InvoicesCorrect
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.InvoiceCorrectId == int.Parse(code));

            if (invoice == null)
            {
                response.Success = false;
                response.Message = "Invoice correct not found.";
                return response;
            }

            var invoiceReturnDto = _mapper.Map<InvoiceCorrectReturnDto>(invoice);
            response.Data = invoiceReturnDto;
            return response;
        }

        public async Task<ServiceResponse<InvoiceCorrect>> SaveInvoice(Company company, InvoiceCorrectAddDto invoiceAddDto)
        {
            var response = new ServiceResponse<InvoiceCorrect>();


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

            invoice.Company = company;
            customer.InvoicesCorrect.Add(invoice);
            await _context.SaveChangesAsync();
            response.Data = invoice;
            return response;
        }


        public async Task<ServiceResponse<InvoiceCorrect>> DeleteInvoice(string code)
        {
            var response = new ServiceResponse<InvoiceCorrect>();

            var invoice = await _context.InvoicesCorrect
            .Include(c => c.Products)
                .FirstOrDefaultAsync(x => x.InvoiceCorrectId == int.Parse(code));

            if (invoice == null)
            {
                response.Success = false;
                response.Message = "Invoice correct not found.";
                return response;
            }

            foreach (var product in invoice.Products)
            {
                _context.Products.Remove(product);
            }

            _context.InvoicesCorrect.Remove(invoice);
            await _context.SaveChangesAsync();
            response.Data = invoice;
            return response;
        }

        public async Task<ServiceResponse<InvoiceCorrect>> UpdateInvoice(Company company, int id, InvoiceCorrectAddDto invoiceDto)
        {
            var response = new ServiceResponse<InvoiceCorrect>();

            InvoiceCorrect invoice = await _context.InvoicesCorrect
                .Include(i => i.Products)
                .SingleOrDefaultAsync(i => i.InvoiceCorrectId == id);

            if (invoice == null)
            {
                response.Success = false;
                response.Message = "Invoice not found.";
                return response;
            }
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
            response.Data = invoice;
            return response;
        }
    }
}
