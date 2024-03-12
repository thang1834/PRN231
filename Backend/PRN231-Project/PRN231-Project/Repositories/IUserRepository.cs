using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int userId);
        Task<User> GetByUsernameAsync(string username);
        Task<User> UpdateUserAsync(User user);
        Task<User> AddUserAsync(User user);
        Task<User> RemoveUserAsync(int userId);
        Task AddRolesForUserAsync(int userId, List<int> roleIds);
    }
}
