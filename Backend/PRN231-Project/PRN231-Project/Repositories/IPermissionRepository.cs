using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
	public interface IPermissionRepository
	{
		Task<IEnumerable<Permission>> GetAllPermissionAsync();
		Task<List<Permission>> GetPermissionsByIdsAsync(List<int> permissionIds);
	}
}
