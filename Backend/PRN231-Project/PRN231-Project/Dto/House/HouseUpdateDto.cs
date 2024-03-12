namespace PRN231_Project.Dto.House
{
    public class HouseUpdateDto
    {
        public string Name { get; set; } = null!;
        public double Price { get; set; }
        // UserId
        public int CategoryId { get; set; }
        public string Description { get; set; } = null!;
        // IsTenanted
    }
}
