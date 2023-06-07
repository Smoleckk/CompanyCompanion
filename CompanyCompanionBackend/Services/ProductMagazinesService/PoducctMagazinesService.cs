using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.ServiceResponseModel;
using CompanyCompanionBackend.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Services.ProductMagazinesService
{
    public class PoducctMagazinesService : IPoducctMagazinesService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public PoducctMagazinesService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceResponse<IEnumerable<ProductMagazine>>> GetProductMagazines(Company company)
        {
            var response = new ServiceResponse<IEnumerable<ProductMagazine>>();

            response.Data = company.ProductMagazines;
            return response;
        }

        public async Task<ServiceResponse<ProductMagazine>> GetProductMagazine(int id)
        {
            var response = new ServiceResponse<ProductMagazine>();

            var productMagazine = await _context.ProductMagazines.FirstOrDefaultAsync(
                c => c.ProductMagazineId == id
            );

            if (productMagazine == null)
            {
                response.Success = false;
                response.Message = "Product magazines not found.";
                return response;
            }
            response.Data = productMagazine;
            return response;
        }
        public async Task<ServiceResponse<ProductMagazine>> GetProductMagazineByName(string name)
        {
            var response = new ServiceResponse<ProductMagazine>();

            var productMagazine = await _context.ProductMagazines.FirstOrDefaultAsync(
                c => c.Name == name
            );
            if (productMagazine == null)
            {
                response.Success = false;
                response.Message = "Product magazines not found.";
                return response;
            }
            response.Data = productMagazine;
            return response;
        }
        public async Task<ServiceResponse<ProductMagazine>> UpdateProductMagazine(ProductMagazine productUpdate)
        {
            var response = new ServiceResponse<ProductMagazine>();

            var productMagazine = await _context.ProductMagazines.FirstOrDefaultAsync(
                c => c.ProductMagazineId == productUpdate.ProductMagazineId
            );

            if (productMagazine == null)
            {
                response.Success = false;
                response.Message = "Product magazines not found.";
                return response;
            }
            productMagazine.Name = productUpdate.Name;
            productMagazine.Price = productUpdate.Price;
            productMagazine.Vat = productUpdate.Vat;
            productMagazine.Qty = productUpdate.Qty;
            productMagazine.Unit = productUpdate.Unit;
            productMagazine.Category = productUpdate.Category;
            productMagazine.Remarks = productUpdate.Remarks;

            await _context.SaveChangesAsync();
            response.Data = productMagazine;
            return response;
        }

        public async Task<ServiceResponse<ProductMagazine>> PostProductMagazine(Company company, ProductMagazineAddDto productMagazineAddDto)
        {
            var response = new ServiceResponse<ProductMagazine>();

            var productMagazine = _mapper.Map<ProductMagazine>(productMagazineAddDto);
            company.ProductMagazines.Add(productMagazine);
            await _context.SaveChangesAsync();
            response.Data = productMagazine;
            return response;
        }

        public async Task<ServiceResponse<ProductMagazine>> DeleteProductMagazine(int id)
        {
            var response = new ServiceResponse<ProductMagazine>();

            var productMagazine = await _context.ProductMagazines.FirstOrDefaultAsync(
                c => c.ProductMagazineId == id
            );

            if (productMagazine == null)
            {
                response.Success = false;
                response.Message = "Product magazines not found.";
                return response;
            }

            _context.ProductMagazines.Remove(productMagazine);
            await _context.SaveChangesAsync();
            response.Data = productMagazine;
            return response;
        }

    }
}
