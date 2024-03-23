﻿using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;

namespace PRN231_Project.Repositories.Impl
{
    public class RoleRepository : IRoleRepository
    {
        private readonly HouseRentalContext _houseRentalContext;
        private readonly IPermissionRepository _permissionRepository;

        public RoleRepository(HouseRentalContext houseRentalContext, IPermissionRepository permissionRepository)
        {
            _houseRentalContext = houseRentalContext;
            _permissionRepository = permissionRepository;
        }
        public async Task<Role> AddRoleAsync(Role role)
        {
            _houseRentalContext.Roles.Add(role);
            await _houseRentalContext.SaveChangesAsync();
            return role;
        }

        public async Task<IEnumerable<Role>> GetAllRolesAsync()
        {
            return await _houseRentalContext.Roles.Include(x => x.Permissions).ToListAsync();
        }

        public async Task<Role> GetRoleByIdAsync(int roleId)
        {
            return await _houseRentalContext.Roles.FindAsync(roleId);
        }
        public async Task<List<Role>> GetRolesByIdsAsync(List<int> roleIds)
        {
            return await _houseRentalContext.Roles.Where(r => roleIds.Contains(r.Id)).ToListAsync();
        }

        public async Task<Role> RemoveRoleAsync(int roleId)
        {
            var role = await _houseRentalContext.Roles.FindAsync(roleId);
            if (role != null)
            {
                await DeleteUserRolesByRoleIdAsync(roleId);
                _houseRentalContext.Roles.Remove(role);
                await _houseRentalContext.SaveChangesAsync();
                return role;
            }
            return null;
        }

        private async Task DeleteUserRolesByRoleIdAsync(int roleId)
        {
            var sql = $"DELETE FROM UserRole WHERE roleId = {roleId}";
            await _houseRentalContext.Database.ExecuteSqlRawAsync(sql);
        }

        public async Task<Role> UpdateRoleAsync(Role role)
        {
            _houseRentalContext.Entry(role).State = EntityState.Modified;
            await _houseRentalContext.SaveChangesAsync();
            return role;
        }

		public async Task AddPermissionsForRoleAsync(int roleId, List<int> permissionIds)
		{
			var role = await _houseRentalContext.Roles
				.Include(u => u.Permissions)
				.FirstOrDefaultAsync(u => u.Id == roleId);

			if (role == null)
			{
				throw new ArgumentException("User not found");
			}

			var existingPermissionIds = role.Permissions.Select(r => r.Id).ToList();
			var newPermissionIds = permissionIds.Except(existingPermissionIds).ToList();

			var newPermissions = await _permissionRepository.GetPermissionsByIdsAsync(newPermissionIds);

			foreach (var permission in newPermissions)
			{
				role.Permissions.Add(permission);
			}

			await _houseRentalContext.SaveChangesAsync();
		}
	}
}
