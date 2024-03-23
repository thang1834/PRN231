using PRN231_Project.Dto.Note;
using PRN231_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Services
{
    public interface INoteService
    {
        Task<IEnumerable<NoteDto>> GetAllNotesAsync();
        Task<NoteDto> GetNoteByIdAsync(int id);
        Task<Note> CreateNoteAsync(NoteCreateDto noteDto);
        Task<bool> UpdateNoteAsync(int id, NoteUpdateDto noteDto);
        Task<bool> RemoveNoteAsync(int id);
    }
}
