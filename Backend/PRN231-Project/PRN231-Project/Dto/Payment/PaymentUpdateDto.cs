namespace PRN231_Project.Dto.Payment
{
    public class PaymentUpdateDto
    {
        public string Name { get; set; } = null!;
        public double Amount { get; set; }
        public string? Description { get; set; }
    }
}
