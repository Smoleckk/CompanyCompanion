using CompanyCompanionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompanyCompanionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public static List<Product> products = new List<Product>()
        {
            new Product { Code="1",Name="skarpety1",Price=10,Category=2,Remarks="Remarks"},
            new Product { Code="2",Name="skarpety2",Price=10,Category=2,Remarks="Remarks"},
            new Product { Code="3",Name="skarpety3",Price=10,Category=2,Remarks= "Remarks" }
    };

        [HttpGet("get-products")]
        public ActionResult<List<Product>> GetProducts() {
        
            return Ok(products);
        }
        [HttpGet("get-products-by-code")]
        public ActionResult<Product> GetProducts(string code)
        {

            Product c = products.Find(c => c.Code == code);
            return Ok(c);
        }

        [HttpPut("update-product-by-code")]
        public ActionResult<Product> UpdateProductByCode(Product product)
        {
            Product c = products.Find(c => c.Code == product.Code);
            c.Code= product.Code;
            c.Name= product.Name;
            products.RemoveAll(x => x.Code == product.Code);
            products.Add(c);
            return Ok(c);
        }
        [HttpDelete("delete-product")]
        public ActionResult<List<InvoiceHeader>> DeleteProduct(string code)
        {
            products.RemoveAll(x => x.Code == code);
            return Ok(products);
        }
        [HttpPost("save-product")]
        public ActionResult<Product> SaveProduct(Product product)
        {
            Product newProduct = new Product { Code=product.Code, Name=product.Name,Price=product.Price,Category=product.Category,Remarks=product.Remarks};
            products.Add(newProduct);
            return Ok(newProduct);
        }
    }
}
