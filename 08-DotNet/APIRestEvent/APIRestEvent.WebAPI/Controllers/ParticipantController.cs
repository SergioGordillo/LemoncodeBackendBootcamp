using APIRestEvent.WebAPI.Data;
using APIRestEvent.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIRestEvent.WebAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ParticipantController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ParticipantController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: /api/participant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants()
        {
            var participants = await _context.Participants.ToListAsync();
            return Ok(participants);
        }

        // GET: /api/participant/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipantById(int id)
        {
            var participantById = await _context.Participants.FindAsync(id);

            if (participantById == null)
            {
                return NotFound();
            }

            return Ok(participantById);
        }

        // POST /api/participant
        [HttpPost]
        public async Task<IActionResult> CreateParticipant([FromBody] Participant newParticipant)
        {
            if (newParticipant == null) {
                return BadRequest("Participant Data are required");
            }

            var participant = newParticipant;

            try
            {
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetParticipantById), new { id = newParticipant.Id }, newParticipant);
            }
            catch (DbUpdateException dbEx)
            {
                if (dbEx.InnerException != null)
                {
                    return StatusCode(500, new
                    {
                        message = "Error saving data in Database",
                        innerMessage = dbEx.InnerException.Message,
                        innerStackTrace = dbEx.InnerException.StackTrace
                    });
                }
                else
                {
                    return StatusCode(500, "Error saving data in Database");
                }
            }

        }

        // PUT: /api/participant/{id}
        [HttpPut]
        public async Task<IActionResult> UpdateParticipant(int id, [FromBody] Participant updatedParticipant)
        {
                if (id != updatedParticipant.Id)
                {
                    return BadRequest("Participant ID mismatch.");
                }

                var existingParticipant = await _context.Participants.FindAsync(id);

                if (existingParticipant == null)
                {
                    return NotFound("Participant not found.");
                }

                existingParticipant.Id = id;
                existingParticipant.Name = updatedParticipant.Name;
                existingParticipant.LastName = updatedParticipant.LastName;
                existingParticipant.Email = updatedParticipant.Email;
                existingParticipant.Events = updatedParticipant.Events;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch(DbUpdateException dbEx)
            {
                if (dbEx.InnerException != null)
                {
                    return StatusCode(500, new
                    {
                        message = "Error saving data in Database",
                        innerMessage = dbEx.InnerException.Message,
                        innerStackTrace = dbEx.InnerException.StackTrace
                    });
                }
                else
                {
                    return StatusCode(500, "Error saving data in Database");
                }
            }
        }

        // DELETE: /api/participant/{id}
        [HttpDelete]
        public async Task<IActionResult> DeleteParticipant(int id)
        {
            var participant = await _context.Participants.FindAsync(id);

            if(participant == null)
            {
                return NotFound();
            }

            try
            {
                _context.Participants.Remove(participant);

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateException dbEx)
            {
                if (dbEx.InnerException != null)
                {
                    return StatusCode(500, new
                    {
                        message = "Error deleting participant from the Database",
                        innerMessage = dbEx.InnerException.Message,
                        innerStackTrace = dbEx.InnerException.StackTrace
                    });
                }
                else
                {
                    return StatusCode(500, "Error deleting participant from the Database");
                }
            }
        }


    }
}
