﻿using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;

namespace PRN231_Project.Repositories.Impl
{
    public class RoleRepository : IRoleRepository
    {
        private readonly HouseRentalContext _houseRentalContext;

        public RoleRepository(HouseRentalContext houseRentalContext)
        {
            _houseRentalContext = houseRentalContext;
        }
        public async Task<Role> AddRoleAsync(Role role)
        {
            _houseRentalContext.Roles.Add(role);
            await _houseRentalContext.SaveChangesAsync();
            return role;
        }

        public async Task<IEnumerable<Role>> GetAllRolesAsync()
        {
            return await _houseRentalContext.Roles.ToListAsync();
        }

        public async Task<Role> GetRoleByIdAsync(int roleId)
        {
            return await _houseRentalContext.Roles.FindAsync(roleId);
        }

        public async Task<Role> RemoveRoleAsync(int roleId)
        {
            var role = await _houseRentalContext.Roles.FindAsync(roleId);
            if (role != null)
            {
                _houseRentalContext.Roles.Remove(role);
                await _houseRentalContext.SaveChangesAsync();
                return role;
            }
            return null;
        }

        public async Task<Role> UpdateRoleAsync(Role role)
        {
            _houseRentalContext.Entry(role).State = EntityState.Modified;
            await _houseRentalContext.SaveChangesAsync();
            return role;
        }
    }
}