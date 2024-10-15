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
        public async Task<ActionResult<IEnumerable<Event>>> GetEventos()
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
    }
}
