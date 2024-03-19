using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PRN231_Project.Models;
using PRN231_Project.Repositories;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using PRN231_Project.Dto.Authentication;
using PRN231_Project.Dto.User;
using PRN231_Project.Dto.Contract;
using System.Diagnostics.Contracts;
using AutoMapper;

namespace PRN231_Project.Services.Impl
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IConfiguration configuration, IMapper mapper)
        {
            _userRepository = userRepository;
            _configuration = configuration; 
            _mapper = mapper;
        }

        public async Task<TokenModel> Authenticate(LoginModel loginModel)
        {
            var user = await _userRepository.GetByUsernameAsync(loginModel.Username);

            if (user != null && IsValidPassword(user, loginModel.Password) && user.IsActive)
            {
                var accessToken = GenerateAccessToken(user);
                var refreshToken = GenerateRefreshToken();
                _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);

                await _userRepository.UpdateUserAsync(user);

                return new TokenModel
                {
                    AccessToken= accessToken,
                    RefreshToken= refreshToken,
                };
            }
            return null;
        }

        public async Task<TokenModel> RefreshToken(TokenModel tokenModel)
        {
            string? accessToken = tokenModel.AccessToken;
            string? refreshToken = tokenModel.RefreshToken;

            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
            {
                return null;
            }
            string username = principal.Identity.Name;

            var user = await _userRepository.GetByUsernameAsync(username);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return null;
            }

            var newAccessToken = GenerateAccessToken(user);
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _userRepository.UpdateUserAsync(user);
            return new TokenModel {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
                };
        }

        private bool IsValidPassword(User user, string password)
        {
            return user.Password == password;
        }

        private string GenerateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                };
            foreach (var userRole in user.Roles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole.Name));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(authClaims),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }

        public async Task<IEnumerable<UserDto>> GetAllUserAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<User> CreateUserAsync(UserCreateDto userDto)
        {
            try
            {
                var user = _mapper.Map<User>(userDto);
                return await _userRepository.AddUserAsync(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<User> UpdateUserAsync(int userId, UserUpdateDto userDto)
        {
            var existingUser = await _userRepository.GetUserByIdAsync(userId);
            if (existingUser == null)
            {
                throw new Exception("User not found");
            }
            _mapper.Map(userDto, existingUser);
            return await _userRepository.UpdateUserAsync(existingUser);
        }

        public async Task<User> RemoveUserAsync(int userId)
        {
            return await _userRepository.RemoveUserAsync(userId);
        }

        public async Task<UserDto> GetUserByIdAsync(int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            return _mapper.Map<UserDto>(user);
        }
        public async Task AddRolesForUserAsync(int userId, List<int> roleIds)
        {
            try
            {
                await _userRepository.AddRolesForUserAsync(userId, roleIds);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error adding roles for user: {ex.Message}");
            }
        }

        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordRequest request)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return false; // User not found
            }

            if (!IsValidPassword(user, request.CurrentPassword))
            {
                return false; // Current password does not match
            }
            user.Password = request.NewPassword;
            await _userRepository.UpdateUserAsync(user);
            return true;
        }
    }
}
