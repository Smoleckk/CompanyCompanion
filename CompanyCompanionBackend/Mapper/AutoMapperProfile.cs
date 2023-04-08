using AutoMapper;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.UserModel;

namespace CompanyCompanionBackend.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Invoice, InvoiceHeader>()
                .ForMember(dest => dest.InvoiceHeaderId, opt => opt.MapFrom(src => src.InvoiceId))
                .ForMember(dest => dest.InvoiceNo, opt => opt.MapFrom(src => src.InvoiceNo))
                .ForMember(dest => dest.DateIssued, opt => opt.MapFrom(src => src.DateIssued))
                .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.CustomerName))
                .ForMember(dest => dest.NetTotal, opt => opt.MapFrom(src => src.NetTotal))
                .ForMember(dest => dest.PaymentStatus, opt => opt.MapFrom(src => src.PaymentStatus))
                .ForMember(dest => dest.IsGenerated, opt => opt.MapFrom(src => src.IsGenerated));

            CreateMap<InvoiceAddDto, Invoice>();
            CreateMap<Invoice, InvoiceReturnDto>();
            CreateMap<CustomerAddDto, Customer>();
            CreateMap<Customer, CustomerReturnDto>();
            CreateMap<ProductMagazineAddDto, ProductMagazine>();

            CreateMap<User, UserReturnDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
        }
    }
}
