using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Dto.Role;
using PRN231_Project.Dto.RolePermission;
using PRN231_Project.Dto.User;
using PRN231_Project.Dto.UserRole;
using PRN231_Project.Services;
using PRN231_Project.Services.Impl;

namespace PRN231_Project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllRolesAsync()
        {
            var roles = await _roleService.GetAllRolesAsync();
            return Ok(roles);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{roleId}")]
        public async Task<IActionResult> GetRoleByIdAsync(int roleId)
        {
            var role = await _roleService.GetRoleByIdAsync(roleId);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateRoleAsync([FromBody] RoleCreateDto roleDto)
        {
            try
            {
                var role = await _roleService.CreateRoleAsync(roleDto);
                return Ok(role);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{roleId}")]
        public async Task<IActionResult> UpdateRoleAsync(int roleId, [FromBody] RoleUpdateDto roleDto)
        {
            try
            {
                await _roleService.UpdateRoleAsync(roleId, roleDto);
                return Ok("Update successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{roleId}")]
        public async Task<IActionResult> RemoveRoleAsync(int roleId)
        {
            try
            {
                await _roleService.RemoveRoleAsync(roleId);
                return Ok("Delete successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

		[Authorize(Roles = "Admin")]
		[HttpPost("addPermissions")]
		public async Task<IActionResult> AddPermissionsForUser(RolePermission rolePermission)
		{
			try
			{
				await _roleService.AddPermissionsForRoleAsync(rolePermission.RoleId, rolePermission.PermissionIds);
				return Ok("Permissions added successfully.");
			}
			catch (Exception ex)
			{
				return BadRequest($"Failed to add permissions: {ex.Message}");
			}
		}
	}
}
