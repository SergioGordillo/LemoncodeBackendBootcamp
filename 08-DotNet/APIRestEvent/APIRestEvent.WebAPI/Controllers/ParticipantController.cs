using APIRestEvent.WebAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIRestEvent.WebAPI.DTOs;

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
        public async Task<ActionResult<IEnumerable<ParticipantDTO>>> GetParticipants()
        {
            var participants = await _context.Participants.Include(p => p.Events).AsNoTracking().ToListAsync();

            if (participants == null || !participants.Any())
            {
                return NotFound("No participants found.");
            }

            var participantsDTOs = participants.Select(p => p.ToDto()).ToList();
            return Ok(participantsDTOs);
        }

        // GET: /api/participant/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ParticipantDTO>> GetParticipantById(int id)
        {
            var participantById = await _context.Participants
                           .Include(p => p.Events)
                           .AsNoTracking()
                           .SingleOrDefaultAsync(p => p.Id == id);

            if (participantById == null)
            {
                return NotFound();
            }

            var participantDTO = participantById.ToDto();

            return Ok(participantDTO);
        }

        // POST /api/participant
        [HttpPost]
        public async Task<IActionResult> CreateParticipant([FromBody] ParticipantDTO newParticipantDTO)
        {
            if (newParticipantDTO == null) {
                return BadRequest("Participant Data are required");
            }

            var newParticipant = newParticipantDTO.ToEntity();

            try
            {
                _context.Participants.Add(newParticipant);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetParticipantById), new { id = newParticipant.Id }, newParticipantDTO);
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
        public async Task<IActionResult> UpdateParticipant(int id, [FromBody] ParticipantDTO updatedParticipantDTO)
        {
                if (id != updatedParticipantDTO.Id)
                {
                    return BadRequest("Participant ID mismatch.");
                }

                var existingParticipant = await _context.Participants
                                .Include(p => p.Events)
                                .SingleOrDefaultAsync(p => p.Id == id);

            if (existingParticipant == null)
                {
                    return NotFound("Participant not found.");
                }

            existingParticipant.Name = updatedParticipantDTO.Name;
            existingParticipant.LastName = updatedParticipantDTO.LastName;
            existingParticipant.Email = updatedParticipantDTO.Email;

            foreach (var eventDTO in updatedParticipantDTO.Events)
            {
                var existingEvent = existingParticipant.Events
                    .FirstOrDefault(e => e.Id == eventDTO.Id);

                if (existingEvent != null)
                {
                    existingEvent.Name = eventDTO.Name;
                    existingEvent.StartDate = eventDTO.StartDate;
                    existingEvent.EndDate = eventDTO.EndDate;
                    existingEvent.Description = eventDTO.Description;
                }
            }

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
