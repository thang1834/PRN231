using AutoMapper;
using PRN231_Project.Dto.Note;
using PRN231_Project.Models;
using PRN231_Project.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRN231_Project.Services.Impl
{
    public class NoteService : INoteService
    {
        private readonly INoteRepository _repository; 
        private readonly IMapper _mapper;

        public NoteService(INoteRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<NoteDto>> GetAllNotesAsync()
        {
            var notes = await _repository.GetAllNotesAsync(); 
            return _mapper.Map<IEnumerable<NoteDto>>(notes);
        }

        public async Task<NoteDto> GetNoteByIdAsync(int id)
        {
            var note = await _repository.GetNoteByIdAsync(id); 
            return _mapper.Map<NoteDto>(note);
        }

        public async Task<Note> CreateNoteAsync(NoteCreateDto noteDto)
        {
            try
            {
                var note = _mapper.Map<Note>(noteDto);
                note.CreateDate = DateTime.Now; 

                return await _repository.AddNoteAsync(note); 
            }
            catch (Exception ex)
            {
                throw new Exception($"Creation failed: {ex.Message}");
            }
        }

        public async Task<bool> UpdateNoteAsync(int id, NoteUpdateDto noteDto)
        {
            var existingNote = await _repository.GetNoteByIdAsync(id); 
            if (existingNote == null)
            {
                return false;
            }

            _mapper.Map(noteDto, existingNote);
            await _repository.UpdateNoteAsync(existingNote); 
            return true;
        }

        public async Task<bool> RemoveNoteAsync(int id)
        {
            return await _repository.RemoveNoteAsync(id); 
        }
    }
}
