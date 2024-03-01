using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;

namespace PRN231_Project.Repositories.Impl
{
    public class UserRepository : IUserRepository
    {
        private readonly HouseRentalContext _houseRentalContext;

        public UserRepository(HouseRentalContext houseRentalContext)
        {
            _houseRentalContext = houseRentalContext;
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _houseRentalContext.Users.FirstOrDefaultAsync(u => u.Username == username);
        }
    }
}
