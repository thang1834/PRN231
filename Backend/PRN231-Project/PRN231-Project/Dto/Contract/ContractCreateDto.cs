namespace PRN231_Project.Dto.Contract
{
    public class ContractCreateDto
    {
        public string Type { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double Price { get; set; }

        public IFormFile ImageUpload { get; set; }
        public int UserId { get; set; }
        public int PaymentId { get; set; }
        public int HouseId { get; set; }
    }
}
