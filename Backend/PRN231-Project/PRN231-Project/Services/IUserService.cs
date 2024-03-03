using PRN231_Project.Controllers;
using PRN231_Project.Dto.Authentication;
using PRN231_Project.Models;

namespace PRN231_Project.Services
{
    public interface IUserService
    {
        Task<TokenModel> Authenticate(LoginModel loginModel);

        Task<TokenModel> RefreshToken(TokenModel tokenModel);
    }
}
