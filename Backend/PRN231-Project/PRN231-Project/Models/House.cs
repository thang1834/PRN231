using System;
using System.Collections.Generic;

namespace PRN231_Project.Models
{
    public partial class House
    {
        public House()
        {
            Contracts = new HashSet<Contract>();
            Services = new HashSet<Service>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public double Price { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; } = null!;
        public bool IsTenanted { get; set; }

        public virtual Category Category { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual ICollection<Contract> Contracts { get; set; }

        public virtual ICollection<Service> Services { get; set; }
    }
}
