using System;
using System.Collections.Generic;

namespace PRN231_Project.Models
{
    public partial class Contract
    {
        public int Id { get; set; }
        public string Type { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Price { get; set; }
        public string FilePath { get; set; } = null!;
        public int UserId { get; set; }
        public int PaymentId { get; set; }
        public int HouseId { get; set; }

        public virtual House House { get; set; } = null!;
        public virtual Payment Payment { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
