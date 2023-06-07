using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.ServiceResponseModel;
using CompanyCompanionBackend.Models.UserModel;

namespace CompanyCompanionBackend.Services.CustomerIService
{
    public interface ICustomerService
    {
        Task<ServiceResponse<IEnumerable<CustomerReturnDto>>> GetCustomers(User user);
        Task<ServiceResponse<CustomerReturnDto>> GetCustomer(int id);
        Task<ServiceResponse<Customer>> PostCustomer(User user, CustomerAddDto customerAddDto);
        Task<ServiceResponse<Customer>> UpdateCustomer(int id, CustomerAddDto customerAddDto);
        Task<ServiceResponse<Customer>> DeleteCustomer(int id);





    }
}
