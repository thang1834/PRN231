using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PRN231_Project.Services;
using PRN231_Project.NormalModels;

namespace PRN231_Project.Controllers
{
    [Route("api/[controller]")]
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
    }
}
