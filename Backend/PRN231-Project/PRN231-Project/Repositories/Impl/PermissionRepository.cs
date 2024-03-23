using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;

namespace PRN231_Project.Repositories.Impl
{
	public class PermissionRepository : IPermissionRepository
	{
		private readonly HouseRentalContext _houseRentalContext;

		public PermissionRepository(HouseRentalContext houseRentalContext)
		{
			_houseRentalContext = houseRentalContext;
		}
		public async Task<IEnumerable<Permission>> GetAllPermissionAsync()
		{
			return await _houseRentalContext.Permissions.ToListAsync();
		}

		public async Task<List<Permission>> GetPermissionsByIdsAsync(List<int> permissionIds)
		{
			return await _houseRentalContext.Permissions.Where(r => permissionIds.Contains(r.Id)).ToListAsync();
		}
	}
}
