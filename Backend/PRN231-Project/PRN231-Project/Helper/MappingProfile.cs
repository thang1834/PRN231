using AutoMapper;
using PRN231_Project.Dto.Contract;
using PRN231_Project.Models;

namespace PRN231_Project.Helper
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contract, ContractDto>();
            CreateMap<ContractDto, Contract>();

            CreateMap<ContractUpdateDto, Contract>();
            CreateMap<Contract, ContractUpdateDto>();

            CreateMap<ContractCreateDto, Contract>();
            CreateMap<Contract, ContractCreateDto>();
        }
    }
}
