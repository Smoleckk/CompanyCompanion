using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.ServiceResponseModel;

namespace CompanyCompanionBackend.Services.ProductMagazinesService
{
    public interface IPoducctMagazinesService
    {
        Task<ServiceResponse<IEnumerable<ProductMagazine>>> GetProductMagazines(Company company);
        Task<ServiceResponse<ProductMagazine>> GetProductMagazine(int id);
        Task<ServiceResponse<ProductMagazine>> GetProductMagazineByName(string name);
        Task<ServiceResponse<ProductMagazine>> UpdateProductMagazine(ProductMagazine productUpdate);
        Task<ServiceResponse<ProductMagazine>> PostProductMagazine(Company company, ProductMagazineAddDto productMagazineAddDto);
        Task<ServiceResponse<ProductMagazine>> DeleteProductMagazine(int id);

    }
}
