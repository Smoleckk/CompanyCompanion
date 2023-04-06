using AutoMapper;
using CompanyCompanionBackend.Models;

namespace CompanyCompanionBackend.Mapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile() {

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


        }
    }
}
