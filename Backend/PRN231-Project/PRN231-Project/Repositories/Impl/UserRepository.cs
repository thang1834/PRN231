using System.Diagnostics.Contracts;
using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;

namespace PRN231_Project.Repositories.Impl
{
    public class UserRepository : IUserRepository
    {
        private readonly HouseRentalContext _houseRentalContext;
        private readonly IRoleRepository _roleRepository;

        public UserRepository(HouseRentalContext houseRentalContext, IRoleRepository roleRepository)
        {
            _houseRentalContext = houseRentalContext;
            _roleRepository = roleRepository;
        }

        public async Task<User> AddUserAsync(User user)
        {
            _houseRentalContext.Users.Add(user);
            await _houseRentalContext.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _houseRentalContext.Users.ToListAsync();
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _houseRentalContext.Users
                .Where(u => u.Username == username)
                .Include(x => x.Roles).FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _houseRentalContext.Users.FindAsync(userId);
        }

        public async Task<User> RemoveUserAsync(int userId)
        {
            var user = await _houseRentalContext.Users.FindAsync(userId);
            if (user != null)
            {
                _houseRentalContext.Users.Remove(user);
                await _houseRentalContext.SaveChangesAsync();
                return user;
            }
            return null;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            _houseRentalContext.Entry(user).State = EntityState.Modified;
            await _houseRentalContext.SaveChangesAsync();
            return user;
        }

        public async Task AddRolesForUserAsync(int userId, List<int> roleIds)
        {
            var user = await _houseRentalContext.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new ArgumentException("User not found");
            }

            var existingRoleIds = user.Roles.Select(r => r.Id).ToList();
            var newRoleIds = roleIds.Except(existingRoleIds).ToList();

            var newRoles = await _roleRepository.GetRolesByIdsAsync(newRoleIds);

            foreach (var role in newRoles)
            {
                user.Roles.Add(role);
            }

            await _houseRentalContext.SaveChangesAsync();
        }
    }
}
