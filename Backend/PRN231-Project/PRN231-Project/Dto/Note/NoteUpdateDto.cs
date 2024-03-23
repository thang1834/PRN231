namespace PRN231_Project.Dto.Note
{
    public class NoteUpdateDto
    {
        public int HouseId { get; set; }
        public string Note1 { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
