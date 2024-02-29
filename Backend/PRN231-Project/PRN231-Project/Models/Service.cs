using System;
using System.Collections.Generic;

namespace PRN231_Project.Models
{
    public partial class Service
    {
        public Service()
        {
            Houses = new HashSet<House>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;

        public virtual ICollection<House> Houses { get; set; }
    }
}
