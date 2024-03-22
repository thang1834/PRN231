using System;
using System.Collections.Generic;

namespace PRN231_Project.Models
{
    public partial class Permission
    {
        public Permission()
        {
            Roles = new HashSet<Role>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Role> Roles { get; set; }
    }
}
