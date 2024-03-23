using System;
using System.Collections.Generic;

namespace PRN231_Project.Models
{
    public partial class Note
    {
        public int Id { get; set; }
        public int HouseId { get; set; }
        public string Note1 { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreateDate { get; set; }

        public virtual House House { get; set; } = null!;
    }
}
