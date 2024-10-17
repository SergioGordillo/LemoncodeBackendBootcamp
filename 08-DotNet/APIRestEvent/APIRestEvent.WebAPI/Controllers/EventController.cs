using Microsoft.AspNetCore.Mvc;
using APIRestEvent.WebAPI.Models;
using System;
using APIRestEvent.WebAPI.Data;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        // GET: /api/event/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventById(int id)
        {
            
            var eventById = await _context.Events.FindAsync(id);

            if (eventById == null)
            {
                return NotFound();
            }

            return Ok(eventById);
        }

        // /api/event
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] Event newEvent)
        {
            if (newEvent == null)
            {
                return BadRequest("Event Data are required");
            }

            try
            {
                _context.Events.Add(newEvent);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetEventById), new { id = newEvent.Id }, newEvent);
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
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] Event updatedEvent)
        {
            if (id != updatedEvent.Id)
            {
                return BadRequest("Event ID mismatch.");
            }

            var existingEvent = await _context.Events.FindAsync(id);

            if (existingEvent == null)
            {
                return NotFound("Event not found.");
            }

            existingEvent.Name = updatedEvent.Name;
            existingEvent.StartDate = updatedEvent.StartDate;
            existingEvent.EndDate = updatedEvent.EndDate;
            existingEvent.Description = updatedEvent.Description;
            existingEvent.Participants = updatedEvent.Participants;

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
    }
}
