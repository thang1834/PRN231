using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;

namespace PRN231_Project.Repositories.Impl
{
    public class UserRepository : IUserRepository
    {
        private readonly HouseRentalContext _houseRentalContext;
        private readonly IRoleRepository _roleRepository;
        private readonly IHouseRepository _houseRepository;
        private readonly IContractRepository _contractRepository;

        public UserRepository(HouseRentalContext houseRentalContext, IRoleRepository roleRepository, IHouseRepository houseRepository, IContractRepository contractRepository)
        {
            _houseRentalContext = houseRentalContext;
            _roleRepository = roleRepository;
            _houseRepository = houseRepository;
            _contractRepository = contractRepository;
        }

        public async Task<User> AddUserAsync(User user)
        {
            _houseRentalContext.Users.Add(user);
            await _houseRentalContext.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _houseRentalContext.Users.Where(u => u.Id != 1).ToListAsync();
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
                await DeleteUserRolesByUserIdAsync(userId);
                List<House> houses = await _houseRepository.GetHouseByUserIdAsync(userId);
                _houseRentalContext.Houses.RemoveRange(houses);
                List<Contract> contracts = (List<Contract>)await _contractRepository.GetContractsByUserIdAsync(userId);
                _houseRentalContext.Contracts.RemoveRange(contracts);
				_houseRentalContext.Users.Remove(user);
                await _houseRentalContext.SaveChangesAsync();
                return user;
            }
            return null;
        }

        private async Task DeleteUserRolesByUserIdAsync(int userId)
        {
            var sql = $"DELETE FROM UserRole WHERE userId = {userId}";
            await _houseRentalContext.Database.ExecuteSqlRawAsync(sql);
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
