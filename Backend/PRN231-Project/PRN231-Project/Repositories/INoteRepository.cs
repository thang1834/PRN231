using PRN231_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Repositories
{
    public interface INoteRepository
    {
        Task<IEnumerable<Note>> GetAllNotesAsync();
        Task<Note> GetNoteByIdAsync(int noteId);
        Task<Note> AddNoteAsync(Note note);
        Task<Note> UpdateNoteAsync(Note note);
        Task<bool> RemoveNoteAsync(int noteId);
    }
}
