namespace PRN231_Project.Dto.Payment
{
    public class PaymentCreateDto
    {
        public string Name { get; set; } = null!;
        public double Amount { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
    }
}