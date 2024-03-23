using PRN231_Project.Dto.Role;
using PRN231_Project.Dto.User;
using PRN231_Project.Models;

namespace PRN231_Project.Services
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleDto>> GetAllRolesAsync();
        Task<RoleDto> GetRoleByIdAsync(int roleId);
        Task<Role> CreateRoleAsync(RoleCreateDto roleDto);
        Task<Role> UpdateRoleAsync(int roleId, RoleUpdateDto roleDto);
        Task<Role> RemoveRoleAsync(int roleId);
		Task AddPermissionsForRoleAsync(int roleId, List<int> permissionIds);
	}
}
