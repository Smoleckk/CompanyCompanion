using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ServiceResponseModel;

namespace CompanyCompanionBackend.Services.InvoiceIService
{
    public interface IInvoiceService
    {
        Task<ServiceResponse<List<Invoice>>> GetInvoicesHeader(Company company);
        Task<ServiceResponse<List<Invoice>>> GetInvoicesHeaderPaid(Company company);
        Task<ServiceResponse<List<Invoice>>> GetInvoicesHeaderDelay(Company company);
        Task<ServiceResponse<List<Invoice>>> GetInvoicesHeaderDraft(Company company);
        Task<ServiceResponse<List<Invoice>>> GetCustomerInvoicesHeader(Company company, string code);
        Task<ServiceResponse<InvoiceReturnDto>> GetInvoiceByCode(string code);
        Task<ServiceResponse<Invoice>> SaveInvoice(Company company, InvoiceAddDto invoiceAddDto);
        Task<ServiceResponse<Invoice>> DeleteInvoice(string code);
        Task<ServiceResponse<Invoice>> UpdateInvoice(Company company, int id, InvoiceAddDto invoiceDto);

    }
}
