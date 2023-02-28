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
        [HttpGet("get-products"), Authorize]
        public ActionResult<List<Product>> GetProducts()
        {
            Product product1 = new Product { Code="1",Name="skarpety1",Price=10,Category=2,Remarks="Remarks"};
            Product product2 = new Product { Code="2",Name="skarpety2",Price=10,Category=2,Remarks="Remarks"};
            Product product3 = new Product { Code="3",Name="skarpety3",Price=10,Category=2,Remarks= "Remarks" };
            List<Product> products = new List<Product>();
            products.Add(product1);
            products.Add(product2);
            products.Add(product3);
            return Ok(products);
        }
        [HttpGet("get-products-by-code"), Authorize]
        public ActionResult<Customer> GetProducts(string code)
        {
            Product product1 = new Product { Code = "1", Name = "skarpety1", Price = 10, Category = 2, Remarks = "Remarks" };
            Product product2 = new Product { Code = "2", Name = "skarpety2", Price = 10, Category = 2, Remarks = "Remarks" };
            Product product3 = new Product { Code = "3", Name = "skarpety3", Price = 10, Category = 2, Remarks = "Remarks" };
            List<Product> products = new List<Product>();
            products.Add(product1);
            products.Add(product2);
            products.Add(product3);
            Product c = products.Find(c => c.Code == code);
            return Ok(c);
        }
    }
}
