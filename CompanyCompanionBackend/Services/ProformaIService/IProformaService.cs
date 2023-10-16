using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.ProformaModel;
using CompanyCompanionBackend.Models.ServiceResponseModel;

namespace CompanyCompanionBackend.Services.ProformaIService
{
    public interface IProformaService
    {
        Task<ServiceResponse<List<Proforma>>> GetProformasHeader(Company company);
        Task<ServiceResponse<ProformaReturnDto>> GetProformaHeaderByCode(int code);
        Task<ServiceResponse<Proforma>> SaveProforma(Company company, ProformaAddDto proformaAddDto);
        Task<ServiceResponse<Proforma>> UpdateProforma(Company company, int id, ProformaAddDto proformaDto);
        Task<ServiceResponse<Proforma>> DeleteProforma(string code);

    }
}
