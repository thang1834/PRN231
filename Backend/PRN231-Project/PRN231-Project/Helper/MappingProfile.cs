﻿using AutoMapper;
using PRN231_Project.Dto.Contract;
using PRN231_Project.Dto.Category;
using PRN231_Project.Dto.House;
using PRN231_Project.Dto.Role;
using PRN231_Project.Dto.User;
using PRN231_Project.Dto.Payment;
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

            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<User, UserCreateDto>();
            CreateMap<UserCreateDto, User>();

            CreateMap<User, UserUpdateDto>();
            CreateMap<UserUpdateDto, User>();

            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();

            CreateMap<Role, RoleCreateDto>();
            CreateMap<RoleCreateDto, Role>();

            CreateMap<Role, RoleUpdateDto>();
            CreateMap<RoleUpdateDto, Role>();

            CreateMap<House, HouseDto>();
            CreateMap<HouseDto, House>();

            CreateMap<HouseUpdateDto, House>();
            CreateMap<House, HouseUpdateDto>();

            CreateMap<HouseCreateDto, House>();
            CreateMap<House, HouseCreateDto>();

            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();

            CreateMap<Payment, PaymentDto>().ReverseMap();
            CreateMap<PaymentUpdateDto, Payment>().ReverseMap();
            CreateMap<PaymentCreateDto, Payment>().ReverseMap();
        }
    }
}
