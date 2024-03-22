namespace PRN231_Project.Dto.Note
{
    public class NoteDto
    {
        public int Id { get; set; }
        public int HouseId { get; set; }
        public string Note1 { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
