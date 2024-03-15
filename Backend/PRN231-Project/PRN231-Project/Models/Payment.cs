using System;
using System.Collections.Generic;

namespace PRN231_Project.Models
{
    public partial class Payment
    {
        public Payment()
        {
            Contracts = new HashSet<Contract>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public double Amount { get; set; }
        public string? Tid { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
        public DateTime? When { get; set; }
        public bool IsPaid { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Contract> Contracts { get; set; }
    }
}
