using AutoMapper;
using Microsoft.Extensions.Configuration;
using PRN231_Project.Dto.Role;
using PRN231_Project.Dto.User;
using PRN231_Project.Models;
using PRN231_Project.Repositories;
using PRN231_Project.Repositories.Impl;

namespace PRN231_Project.Services.Impl
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public RoleService(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        public async Task<Role> CreateRoleAsync(RoleCreateDto roleDto)
        {
            try
            {
                var role = _mapper.Map<Role>(roleDto);
                return await _roleRepository.AddRoleAsync(role);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<RoleDto>> GetAllRolesAsync()
        {
            var roles = await _roleRepository.GetAllRolesAsync();
            return _mapper.Map<IEnumerable<RoleDto>>(roles);
        }

        public async Task<RoleDto> GetRoleByIdAsync(int roleId)
        {
            var role = await _roleRepository.GetRoleByIdAsync(roleId);
            return _mapper.Map<RoleDto>(role);
        }

        public async Task<Role> RemoveRoleAsync(int roleId)
        {
            return await _roleRepository.RemoveRoleAsync(roleId);
        }

        public async Task<Role> UpdateRoleAsync(int roleId, RoleUpdateDto roleDto)
        {
            var existingRole = await _roleRepository.GetRoleByIdAsync(roleId);
            if (existingRole == null)
            {
                throw new Exception("Role not found");
            }
            _mapper.Map(roleDto, existingRole);
            return await _roleRepository.RemoveRoleAsync(roleId);
        }
    }
}
