using Microsoft.EntityFrameworkCore;
using PRN231_Project.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PRN231_Project.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly HouseRentalContext _context;

        public NoteRepository(HouseRentalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Note>> GetAllNotesAsync()
        {
            return await _context.Notes.ToListAsync();
        }

        public async Task<Note> GetNoteByIdAsync(int noteId)
        {
            return await _context.Notes.FindAsync(noteId);
        }

        public async Task<Note> AddNoteAsync(Note note)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            return note;
        }

        public async Task<Note> UpdateNoteAsync(Note note)
        {
            _context.Entry(note).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return note;
        }

        public async Task<bool> RemoveNoteAsync(int noteId)
        {
            var note = await _context.Notes.FindAsync(noteId);
            if (note != null)
            {
                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

    }
}
