using Microsoft.AspNetCore.Authorization;
using PRN231_Project.Enums;

namespace PRN231_Project.Requirement
{
	public class PermissionRequirement: IAuthorizationRequirement
	{
		public PermissionEnum Permission { get; }

		public PermissionRequirement(PermissionEnum permission)
		{
			Permission = permission;
		}
	}
}
