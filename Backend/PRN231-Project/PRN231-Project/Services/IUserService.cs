using PRN231_Project.Controllers;
using PRN231_Project.Dto.Authentication;
using PRN231_Project.Dto.Contract;
using PRN231_Project.Dto.User;
using PRN231_Project.Models;

namespace PRN231_Project.Services
{
    public interface IUserService
    {
        Task<TokenModel> Authenticate(LoginModel loginModel);
        Task<TokenModel> RefreshToken(TokenModel tokenModel);
        Task<IEnumerable<UserDto>> GetAllUserAsync();
        Task<UserDto> GetUserByIdAsync(int userId);
        Task<User> CreateUserAsync(UserCreateDto userDto);
        Task<User> UpdateUserAsync(int userId, UserUpdateDto userDto);
        Task<User> RemoveUserAsync(int userId);
        Task AddRolesForUserAsync(int userId, List<int> roleIds);
    }
}
