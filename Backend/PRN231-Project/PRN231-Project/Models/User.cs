using System;
using System.Collections.Generic;

namespace PRN231_Project.Models
{
    public partial class User
    {
        public User()
        {
            Contracts = new HashSet<Contract>();
            Houses = new HashSet<House>();
            Payments = new HashSet<Payment>();
            Requests = new HashSet<Request>();
            Roles = new HashSet<Role>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public DateTime Dob { get; set; }
        public string IdentificationNumber { get; set; } = null!;
        public bool IsActive { get; set; }
        public string Password { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }

        public virtual ICollection<Contract> Contracts { get; set; }
        public virtual ICollection<House> Houses { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Request> Requests { get; set; }

        public virtual ICollection<Role> Roles { get; set; }
    }
}
