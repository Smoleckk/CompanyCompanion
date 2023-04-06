using CompanyCompanionBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public static List<ProductMagazine> products = new List<ProductMagazine>()
        {
            new ProductMagazine { Code="1",Name="skarpety1",Price=10,Category=2,Remarks="Remarks"},
            new ProductMagazine { Code="2",Name="skarpety2",Price=10,Category=2,Remarks="Remarks"},
            new ProductMagazine { Code="3",Name="skarpety3",Price=10,Category=2,Remarks= "Remarks" }
    };

        [HttpGet("get-products")]
        public ActionResult<List<ProductMagazine>> GetProducts()
        {

            return Ok(products);
        }
        [HttpGet("get-products-by-code")]
        public ActionResult<ProductMagazine> GetProducts(string Code)
        {

            ProductMagazine c = products.Find(c => c.Code == Code);
            return Ok(c);
        }

        [HttpPut("update-product-by-code")]
        public ActionResult<ProductMagazine> UpdateProductByCode(ProductMagazine product)
        {
            ProductMagazine c = products.Find(c => c.Code == product.Code);
            c.Code = product.Code;
            c.Name = product.Name;
            products.RemoveAll(x => x.Code == product.Code);
            products.Add(c);
            return Ok(c);
        }
        [HttpDelete("delete-product")]
        public ActionResult<List<ProductMagazine>> DeleteProduct(string Code)
        {
            products.RemoveAll(x => x.Code == Code);
            return Ok(products);
        }
        [HttpPost("save-product")]
        public ActionResult<ProductMagazine> SaveProduct(ProductMagazine product)
        {
            ProductMagazine newProduct = new ProductMagazine { Code = product.Code, Name = product.Name, Price = product.Price, Category = product.Category, Remarks = product.Remarks };
            products.Add(newProduct);
            return Ok(newProduct);
        }
    }
}
