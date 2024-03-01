using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PRN231_Project.Services;

namespace PRN231_Project.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var token = await _userService.Authenticate(model.Username, model.Password);

            if (token == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
            return Ok(new { token });
        }

    }

    public class LoginViewModel
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
