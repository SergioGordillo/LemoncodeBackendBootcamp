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
    }
}
