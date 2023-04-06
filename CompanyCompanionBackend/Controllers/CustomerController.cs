using CompanyCompanionBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace CompanyCompanionBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        [HttpGet("get-customers")]
        public ActionResult<List<Customer>> GetCustomers()
        {
            Customer customer1 = new Customer { CustomerId = 1, CustomerName = "aaa", CustomerNip = "123972821", CustomerAddress = "00-000", CustomerCity = "Warszawa" };
            Customer customer2 = new Customer { CustomerId = 2, CustomerName = "aaa", CustomerNip = "123972821", CustomerAddress = "00-000", CustomerCity = "Warszawa" };
            Customer customer3 = new Customer { CustomerId = 3, CustomerName = "aaa", CustomerNip = "123972821" };
            List<Customer> customers = new List<Customer> { };
            customers.Add(customer1);
            customers.Add(customer2);
            customers.Add(customer3);

            return Ok(customers);
        }
        [HttpGet("get-customers-by-code")]
        public ActionResult<Customer> GetCustomers(string code)
        {
            Customer customer1 = new Customer { CustomerId = 1, CustomerName = "aaa", CustomerNip = "123972821", CustomerAddress = "00-000", CustomerCity = "Warszawa" };
            Customer customer2 = new Customer { CustomerId = 2, CustomerName = "aaa", CustomerNip = "123972821", CustomerAddress = "00-000", CustomerCity = "Warszawa" };
            Customer customer3 = new Customer { CustomerId = 3, CustomerName = "aaa", CustomerNip = "123972821" };
            List<Customer> customers = new List<Customer>();
            customers.Add(customer1);
            customers.Add(customer2);
            customers.Add(customer3);
            Customer c = customers.Find(c => c.CustomerId == Int32.Parse(code));
            return Ok(c);
        }
    }
}
