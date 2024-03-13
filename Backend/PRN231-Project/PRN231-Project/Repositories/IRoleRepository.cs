using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllRolesAsync();
        Task<Role> GetRoleByIdAsync(int roleId);
        Task<List<Role>> GetRolesByIdsAsync(List<int> roleIds);
        Task<Role> UpdateRoleAsync(Role role);
        Task<Role> AddRoleAsync(Role role);
        Task<Role> RemoveRoleAsync(int roleId);
    }
}
