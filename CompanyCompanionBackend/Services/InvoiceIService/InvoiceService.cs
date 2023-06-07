using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceCountModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ServiceResponseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Services.InvoiceIService
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public InvoiceService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }



        public async Task<ServiceResponse<List<Invoice>>> GetInvoicesHeader(Company company)
        {
            var response = new ServiceResponse<List<Invoice>>();
            response.Data = company.Invoices.ToList();
            return response;
        }
        public async Task<ServiceResponse<List<Invoice>>> GetInvoicesHeaderPaid(Company company)
        {
            var response = new ServiceResponse<List<Invoice>>();
            response.Data = company.Invoices.Where(e => e.IsGenerated == true && e.PaymentStatus == "Paid").ToList(); ;
            return response;

        }
        public async Task<ServiceResponse<List<Invoice>>> GetInvoicesHeaderDelay(Company company)
        {
            var response = new ServiceResponse<List<Invoice>>();
            response.Data = company.Invoices.Where(e => DateTime.Parse(e.DueDate) < DateTime.Today && e.PaymentStatus == "Unpaid" && e.IsGenerated == true).ToList();
            return response;

        }

        public async Task<ServiceResponse<List<Invoice>>> GetInvoicesHeaderDraft(Company company)
        {

            var response = new ServiceResponse<List<Invoice>>();
            response.Data = company.Invoices.Where(e => e.IsGenerated == false).ToList();
            return response;

        }
        public async Task<ServiceResponse<List<Invoice>>> GetCustomerInvoicesHeader(Company company, string code)
        {
            var response = new ServiceResponse<List<Invoice>>();
            response.Data = company.Invoices.Where(i => i.CustomerName == code).ToList();
            return response;
        }

        public async Task<ServiceResponse<InvoiceReturnDto>> GetInvoiceByCode(string code)
        {
            var response = new ServiceResponse<InvoiceReturnDto>();

            var invoice = await _context.Invoices
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.InvoiceId == int.Parse(code));

            if (invoice == null)
            {
                response.Success = false;
                response.Message = "Invoice not found.";
                return response;
            }

            var invoiceReturnDto = _mapper.Map<InvoiceReturnDto>(invoice);
            response.Data = invoiceReturnDto;
            return response;
        }

        public async Task<ServiceResponse<Invoice>> SaveInvoice(Company company, InvoiceAddDto invoiceAddDto)
        {
            var response = new ServiceResponse<Invoice>();

            var invoiceCount = company.InvoiceCounts.FirstOrDefault(i => i.DateIssued == invoiceAddDto.DateIssued.Substring(0, 7) && i.Name == "Invoice");
            if (invoiceAddDto.IsGenerated)
            {


                if (invoiceCount != null)
                {
                    invoiceCount.InvoiceNumber++;
                    invoiceAddDto.InvoiceNo = invoiceCount.InvoiceNumber.ToString() + "/" + invoiceAddDto.DateIssued.Substring(5, 2) + "/" + invoiceAddDto.DateIssued.Substring(0, 4);

                }
                else
                {
                    var n = new InvoiceCount { Name = "Invoice", DateIssued = invoiceAddDto.DateIssued.Substring(0, 7), InvoiceNumber = 1 };
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

            invoice.Company = company;
            customer.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            response.Data = invoice;
            return response;
        }


        public async Task<ServiceResponse<Invoice>> DeleteInvoice(string code)
        {
            var response = new ServiceResponse<Invoice>();

            var invoice = await _context.Invoices
                .Include(c => c.Products)
                .FirstOrDefaultAsync(x => x.InvoiceId == int.Parse(code));

            if (invoice == null)
            {
                response.Success = false;
                response.Message = "Invoice not found.";
                return response;
            }

            foreach (var product in invoice.Products)
            {
                _context.Products.Remove(product);
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
            response.Data = invoice;
            return response;
        }

        public async Task<ServiceResponse<Invoice>> UpdateInvoice(Company company, int id, InvoiceAddDto invoiceDto)
        {
            var response = new ServiceResponse<Invoice>();

            Invoice invoice = await _context.Invoices
                .Include(i => i.Products)
                .SingleOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
            {
                response.Success = false;
                response.Message = "Invoice not found.";
                return response;
            }
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
            response.Data = invoice;
            return response;
        }

    }
}
