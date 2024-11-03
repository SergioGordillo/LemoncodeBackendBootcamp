using Microsoft.AspNetCore.Mvc;
using APIRestEvent.WebAPI.Models;
using System;
using APIRestEvent.WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using APIRestEvent.WebAPI.DTOs;

namespace APIRestEvent.WebAPI.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EventController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/event
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDTO>>> GetEvents()
        {
            var events = await _context.Events.Include(e => e.Participants).AsNoTracking().ToListAsync();

            if (events == null || !events.Any())
            {
                return NotFound("No events found.");
            }

            var eventDTOs = events.Select(e => e.ToDto()).ToList();
            return Ok(eventDTOs);
        }

        // GET: /api/event/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDTO>> GetEventById(int id)
        {

            var eventById = await _context.Events
                            .Include(e => e.Participants)
                            .AsNoTracking()
                            .SingleOrDefaultAsync(e => e.Id == id);

            if (eventById == null)
            {
                return NotFound();
            }

            var eventDTO = eventById.ToDto();

            return Ok(eventDTO);
        }

        // /api/event
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] EventDTO newEventDTO)
        {
            if (newEventDTO == null)
            {
                return BadRequest("Event Data are required");
            }

            var newEvent = newEventDTO.ToEntity();

            try
            {
                _context.Events.Add(newEvent);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetEventById), new { id = newEvent.Id }, newEventDTO);
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

        // /api/event/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventDTO updatedEventDTO)
        {
            if (id != updatedEventDTO.Id)
            {
                return BadRequest("Event ID mismatch.");
            }

            var existingEvent = await _context.Events
                                .Include(e => e.Participants)
                                .SingleOrDefaultAsync(e => e.Id == id);

            if (existingEvent == null)
            {
                return NotFound("Event not found.");
            }

            existingEvent.Name = updatedEventDTO.Name;
            existingEvent.StartDate = updatedEventDTO.StartDate;
            existingEvent.EndDate = updatedEventDTO.EndDate;
            existingEvent.Description = updatedEventDTO.Description;

            foreach (var participantDTO in updatedEventDTO.Participants)
            {
                var existingParticipant = existingEvent.Participants
                    .FirstOrDefault(p => p.Id == participantDTO.Id);

                if (existingParticipant != null)
                {
                    existingParticipant.Name = participantDTO.Name;
                    existingParticipant.LastName = participantDTO.LastName;
                    existingParticipant.Email = participantDTO.Email;
                    Console.WriteLine($"Updated participant {existingParticipant.Id}: {existingParticipant.Name}");
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                return NoContent(); 
            }
            catch (DbUpdateException dbEx)
            {
                if (dbEx.InnerException != null)
                {
                    return StatusCode(500, new
                    {
                        message = "Error updating event in the Database",
                        innerMessage = dbEx.InnerException.Message,
                        innerStackTrace = dbEx.InnerException.StackTrace
                    });
                }
                else
                {
                    return StatusCode(500, "Error updating event in the Database");
                }
            }
        }

        // /api/event/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventToDelete = await _context.Events.FindAsync(id);

            if (eventToDelete == null)
            {
                return NotFound();
            }

            try
            {
                _context.Events.Remove(eventToDelete);

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateException dbEx)
            {
                if (dbEx.InnerException != null)
                {
                    return StatusCode(500, new
                    {
                        message = "Error deleting event from the Database",
                        innerMessage = dbEx.InnerException.Message,
                        innerStackTrace = dbEx.InnerException.StackTrace
                    });
                }
                else
                {
                    return StatusCode(500, "Error deleting event from the Database");
                }
            }
        }

        // GET: /api/event/{id}/participants
        [HttpGet("{id}/participants")]
        public async Task<ActionResult<IEnumerable<ParticipantDTO>>> GetParticipantsByEventId(int id)
        {
            var eventById = await _context.Events
                                       .Include(e => e.Participants)  
                                       .FirstOrDefaultAsync(e => e.Id == id);

            if (eventById == null)
            {
                return NotFound($"Event with {id} dont exist");
            }

            var participantDTOs = eventById.Participants.Select(p => p.ToDto()).ToList();

            return Ok(participantDTOs);
        }

        // POST: /api/event/{id}/participants
        [HttpPost("{id}/participants")]
        public async Task<IActionResult> AddParticipantToEvent(int id, [FromBody] ParticipantDTO participantDTO)
        {
            var eventById = await _context.Events
                                       .Include(e => e.Participants)
                                       .FirstOrDefaultAsync(e => e.Id == id);

            if (eventById == null)
            {
                return NotFound($"Event with {id} dont exist");
            }

            if (eventById.Participants.Any(p => p.Id == participantDTO.Id))
            {
                return BadRequest("Participant is already registered in this Event");
            }

            var participantEntity = participantDTO.ToEntity();

            eventById.Participants.Add(participantEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetParticipantsByEventId), new { id = eventById.Id }, participantDTO);
        }

        // DELETE: /api/event/{id}/participants/{participantId}
        [HttpDelete("{id}/participants/{participantId}")]
        public async Task<IActionResult> RemoveParticipantFromEvent(int id, int participantId)
        {
            var eventById = await _context.Events
                                       .Include(e => e.Participants)
                                       .FirstOrDefaultAsync(e => e.Id == id);

            if (eventById == null)
            {
                return NotFound($"Event with {id} dont exist");
            }

            var participantById = eventById.Participants.FirstOrDefault(p => p.Id == participantId);

            if (participantById == null)
            {
                return NotFound($"Participant with ID {participantId} is not registered in the event with ID {id}.");

            }

            eventById.Participants.Remove(participantById);

            await _context.SaveChangesAsync();

            return NoContent();
        }





    }
}
