using CompanyCompanionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompanyCompanionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        [HttpGet("get-customers"), Authorize]
        public ActionResult<List<Customer>> GetCustomers()
        {
            Customer customer1 = new Customer { Code = "1", Address = "Warszawa", Name = "Customer1" };
            Customer customer2 = new Customer { Code = "2", Address = "Gdynia", Name = "Customer2" };
            Customer customer3 = new Customer { Code = "3", Address = "Lublin", Name = "Customer3" };
            List<Customer> customers = new List<Customer> { };
            customers.Add(customer1);
            customers.Add(customer2);
            customers.Add(customer3);

            return Ok(customers);
        }
        [HttpGet("get-customers-by-code"), Authorize]
        public ActionResult<Customer> GetCustomers(string code)
        {
            Customer customer1 = new Customer { Code = "1", Address = "Warszawa", Name = "Customer1" };
            Customer customer2 = new Customer { Code = "2", Address = "Gdynia", Name = "Customer2" };
            Customer customer3 = new Customer { Code = "3", Address = "Lublin", Name = "Customer3" };
            List<Customer> customers = new List<Customer>();
            customers.Add(customer1);
            customers.Add(customer2);
            customers.Add(customer3);
            Customer c = customers.Find(c => c.Code == code);
            return Ok(c);
        }
    }
}
