using System;
using System.Collections.Generic;

namespace PRN231_Project.Models
{
    public partial class Request
    {
        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public int UserId { get; set; }
        public string Status { get; set; } = null!;

        public virtual User User { get; set; } = null!;
    }
}
