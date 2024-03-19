namespace PRN231_Project.Dto.Payment
{
    public class PaymentCreateDto
    {
        public int UserId { get; set; }
        public double Amount { get; set; }
        public DateTime DateCreated { get; set; }
        public string? Name { get; set; }
        public string? Status { get; set; }
    }
}
