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
        public int UserId { get; set; }
        public double Amount { get; set; }
        public string? Invoice { get; set; }
        public DateTime DateCreated { get; set; }
        public string? Name { get; set; }
        public string? Status { get; set; }
        public DateTime? DateCompleted { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Contract> Contracts { get; set; }
    }
}
