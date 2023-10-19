using AutoMapper;
using CompanyCompanionBackend.Data;
using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.ServiceResponseModel;
using CompanyCompanionBackend.Models.UserModel;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Services.CustomerIService
{
    public class CustomerService : ICustomerService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CustomerService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<IEnumerable<CustomerReturnDto>>> GetCustomers(User user)
        {
            var response = new ServiceResponse<IEnumerable<CustomerReturnDto>>();

            //var user = await GetUserWithCompany();
            var customers = user.Company.Customers;


            IEnumerable<CustomerReturnDto> customersReturn = _mapper.Map<IEnumerable<CustomerReturnDto>>(customers);

            response.Data = customersReturn;

            return response;
        }

        public async Task<ServiceResponse<CustomerReturnDto>> GetCustomer(int id)
        {
            var response = new ServiceResponse<CustomerReturnDto>();

            Customer customer = await _context.Customers.Include(i => i.Invoices).FirstOrDefaultAsync(
                c => c.CustomerId == id
            );

            if (customer == null)
            {
                response.Success = false;
                response.Message = "customer not found.";
                return response;
            }
            var customersReturn = _mapper.Map<CustomerReturnDto>(customer);
            response.Data = customersReturn;
            return response;
        }

        public async Task<ServiceResponse<Customer>> PostCustomer(User user, CustomerAddDto customerAddDto)
        {
            var response = new ServiceResponse<Customer>();
            Company company = user.Company;
            Customer customerBase = company.Customers.FirstOrDefault(c => c.CustomerNip == customerAddDto.CustomerNip);
            //       Customer customerBase = await _context.Customers.FirstOrDefaultAsync(
            //    c => c.CustomerNip == customerAddDto.CustomerNip
            //);
            if (customerBase != null)
            {
                response.Success = false;
                response.Message = "Customer already exist with nip: " + customerBase.CustomerNip;
                return response;
            }

            // var user = await GetUserWithCompany();
            var customer = _mapper.Map<Customer>(customerAddDto);
            company.Customers.Add(customer);
            await _context.SaveChangesAsync();

            response.Data = customer;

            return response;
        }

        public async Task<ServiceResponse<Customer>> UpdateCustomer(int id, CustomerAddDto customerAddDto)
        {
            var response = new ServiceResponse<Customer>();
            var customer = await _context.Customers.FirstOrDefaultAsync(
                c => c.CustomerId == id
            );

            if (customer == null)
            {
                response.Success = false;
                response.Message = "customer not exist";
                return response;
            }
            customer.CustomerName = customerAddDto.CustomerName;
            customer.CustomerNip = customerAddDto.CustomerNip;
            customer.CustomerCity = customerAddDto.CustomerCity;
            customer.CustomerAddress = customerAddDto.CustomerAddress;
            await _context.SaveChangesAsync();

            response.Data = customer;
            return response;
        }
        public async Task<ServiceResponse<Customer>> DeleteCustomer(int id)
        {
            var response = new ServiceResponse<Customer>();

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);

            if (customer == null)
            {
                response.Success = false;
                response.Message = "customer not exist";
                return response;
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return response;
        }

        //private async Task<User> GetUserWithCompany()
        //{
        //    var userName = User?.Identity?.Name;
        //    return await _context.Users
        //        .Include(c => c.Company)
        //        .ThenInclude(i => i.Customers)
        //        .FirstOrDefaultAsync(c => c.Username == userName);
        //}
    }
}
