using PRN231_Project.Models;

namespace PRN231_Project.Services
{
    public interface IUserService
    {
        Task<string> Authenticate(string username, string password);
    }
}
