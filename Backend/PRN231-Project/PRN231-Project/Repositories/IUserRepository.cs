using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByUsernameAsync(string username);
    }
}
