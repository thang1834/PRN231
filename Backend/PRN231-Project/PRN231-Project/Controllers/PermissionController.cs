using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Dto.UserRole;
using PRN231_Project.Services;
using PRN231_Project.Services.Impl;

namespace PRN231_Project.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class PermissionController : ControllerBase
	{
		private readonly IPermissionService _permissionService;

		public PermissionController(IPermissionService permissionService)
		{
			_permissionService = permissionService;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetAllPermissionsAsync()
		{
			var permissions = await _permissionService.GetAllPermissionAsync();
			return Ok(permissions);
		}
	}
}
