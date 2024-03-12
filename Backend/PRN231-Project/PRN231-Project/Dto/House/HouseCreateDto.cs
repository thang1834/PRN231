namespace PRN231_Project.Dto.House
{
    public class HouseCreateDto
    {
        public string Name { get; set; } = null!;
        public double Price { get; set; } 
        public int? UserId { get; set; } 
        public int CategoryId { get; set; } 
        public string Description { get; set; } = null!;
    }
}
