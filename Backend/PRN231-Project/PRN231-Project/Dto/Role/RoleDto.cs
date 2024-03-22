using PRN231_Project.Dto.Permission;

namespace PRN231_Project.Dto.Role
{
    public class RoleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
		public ICollection<PermissionDto> Permissions { get; set; }
	}
}
