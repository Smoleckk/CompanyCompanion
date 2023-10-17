using BIRService.Models;

namespace BIRService
{
    public interface IBIRSearchService
    {
        Task<DanePodmiotu> GetCompanyDataByNipIdAsync(string vatId);
        Task<DanePodmiotu> GetCompanyDataByRegonAsync(string regonId);

    }
}