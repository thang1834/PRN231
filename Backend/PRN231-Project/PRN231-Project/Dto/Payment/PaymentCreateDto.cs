namespace PRN231_Project.Dto.Payment
{
    public class PaymentCreateDto
    {
        public int UserId { get; set; }
        public double Amount { get; set; }
        public string Invoice { get; set; } = null!;
        public DateTime DateCreated { get; set; }
    }
}
