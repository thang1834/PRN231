using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PRN231_Project.Services;
using PRN231_Project.Dto.Authentication;
using PRN231_Project.Services.Impl;
using PRN231_Project.Dto.Contract;
using PRN231_Project.Dto.User;
using Microsoft.AspNetCore.Authorization;
using PRN231_Project.Dto.UserRole;

namespace PRN231_Project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var token = await _userService.Authenticate(model);

            if (token == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
            return Ok(new { token });
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel is null)
            {
                return BadRequest("Invalid client request");
            }
            var token = await _userService.RefreshToken(tokenModel);
            if (token == null)
            {
                return BadRequest("Error");
            }
            return Ok(new {token});
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            var users = await _userService.GetAllUserAsync();
            return Ok(users);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserByIdAsync(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody] UserCreateDto userDto)
        {
            try
            {
                var user = await _userService.CreateUserAsync(userDto);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUserAsync(int userId, [FromBody] UserUpdateDto userDto)
        {
            try
            {
                await _userService.UpdateUserAsync(userId, userDto);
                return Ok("Update successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{userId}")]
        public async Task<IActionResult> RemoveUserAsync(int userId)
        {
            try
            {
                await _userService.RemoveUserAsync(userId);
                return Ok("Delete successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("addRoles")]
        public async Task<IActionResult> AddRolesForUser(UserRole userRole)
        {
            try
            {
                await _userService.AddRolesForUserAsync(userRole.UserId, userRole.RoleIds);
                return Ok("Roles added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add roles: {ex.Message}");
            }
        }
    }
}
