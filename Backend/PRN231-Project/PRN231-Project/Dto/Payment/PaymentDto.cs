namespace PRN231_Project.Dto.Payment
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public double Amount { get; set; }
        public string? Tid { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
        public DateTime? When { get; set; }
        public bool IsPaid { get; set; }
    }
}
