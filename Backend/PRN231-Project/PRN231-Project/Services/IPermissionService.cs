using PRN231_Project.Dto.House;
using PRN231_Project.Dto.Permission;

namespace PRN231_Project.Services
{
	public interface IPermissionService
	{
		Task<IEnumerable<PermissionDto>> GetAllPermissionAsync();
	}
}
