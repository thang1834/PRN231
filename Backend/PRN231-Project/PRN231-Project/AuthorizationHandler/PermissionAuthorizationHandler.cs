using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;
using PRN231_Project.Requirement;
using System.Security.Claims;

namespace PRN231_Project.AuthorizationHandler
{
	public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
	{
		private readonly HouseRentalContext _context;

		public PermissionAuthorizationHandler(HouseRentalContext houseRentalContext)
		{
			_context = houseRentalContext;
		}

		protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
		{
			int userId = int.Parse(context.User.FindFirstValue(ClaimTypes.NameIdentifier));
			var userRoles = await _context.Users
			.Where(u => u.Id == userId)
			.SelectMany(u => u.Roles)
			.Include(r => r.Permissions)
			.ToListAsync();
			Console.WriteLine(userRoles);

			if (userRoles.Any(role => role.Permissions.Any(p => p.Name == requirement.Permission.ToString())))
			{
				context.Succeed(requirement);
			}
		}
	}

}
