using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.InvoiceCorrectModel;
using CompanyCompanionBackend.Models.ServiceResponseModel;

namespace CompanyCompanionBackend.Services.InvoiceCorrectIService
{
    public interface IInvoiceCorrectService
    {
        Task<ServiceResponse<List<InvoiceCorrect>>> GetInvoicesHeader(Company company);
        Task<ServiceResponse<List<InvoiceCorrect>>> GetCustomerInvoicesHeader(Company company, string code);
        Task<ServiceResponse<InvoiceCorrectReturnDto>> GetInvoiceByCode(string code);
        Task<ServiceResponse<InvoiceCorrect>> SaveInvoice(Company company, InvoiceCorrectAddDto invoiceAddDto);
        Task<ServiceResponse<InvoiceCorrect>> DeleteInvoice(string code);
        Task<ServiceResponse<InvoiceCorrect>> UpdateInvoice(Company company, int id, InvoiceCorrectAddDto invoiceDto);

    }
}
