namespace PRN231_Project.Dto.User
{
    public class UserDto
    {
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
    }
}
