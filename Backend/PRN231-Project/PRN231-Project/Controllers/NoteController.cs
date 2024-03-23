using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PRN231_Project.Dto.Note; // Sử dụng DTO từ namespace này
using PRN231_Project.Services; // Giả sử bạn có một INoteService tương tự như IHouseService

namespace PRN231_Project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : Controller
    {
        private readonly INoteService _noteService;

        public NoteController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNotesAsync()
        {
            var notes = await _noteService.GetAllNotesAsync();
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNoteByIdAsync(int id)
        {
            var note = await _noteService.GetNoteByIdAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNoteAsync([FromBody] NoteCreateDto noteDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var note = await _noteService.CreateNoteAsync(noteDto);
                    if (note != null)
                    {
                        return Ok(note);
                    }
                    return BadRequest("Unable to create note");
                }
                return BadRequest("ModelState is not valid");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNoteAsync(int id, [FromBody] NoteUpdateDto noteDto)
        {
            try
            {
                var result = await _noteService.UpdateNoteAsync(id, noteDto);
                if (!result)
                {
                    return NotFound($"No note found with ID {id}");
                }

                return Ok("Update successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveNoteAsync(int id)
        {
            try
            {
                var result = await _noteService.RemoveNoteAsync(id);
                if (!result)
                {
                    return NotFound($"No note found with ID {id}");
                }

                return Ok("Delete successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
