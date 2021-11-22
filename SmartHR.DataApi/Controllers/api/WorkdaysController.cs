using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Data.Models;

namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class WorkdaysController : ControllerBase
    {
        private readonly HRDbContext _context;

        public WorkdaysController(HRDbContext context)
        {
            _context = context;
        }

        // GET: api/Workdays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workday>>> GetWorkDays()
        {
            return await _context.WorkDays.ToListAsync();
        }

        // GET: api/Workdays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Workday>> GetWorkday(int id)
        {
            var workday = await _context.WorkDays.FindAsync(id);

            if (workday == null)
            {
                return NotFound();
            }

            return workday;
        }

        // PUT: api/Workdays/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkday(int id, Workday workday)
        {
            if (id != workday.WorkdayId)
            {
                return BadRequest();
            }

            _context.Entry(workday).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkdayExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Workdays
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Workday>> PostWorkday(Workday workday)
        {
            _context.WorkDays.Add(workday);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkday", new { id = workday.WorkdayId }, workday);
        }

        /*
         * custom post method
         */
        [HttpPost("Bulk")]
        public async Task<ActionResult> PostBusinessDayArray(Workday[] businessDays)
        {
            foreach (var b in businessDays)
            {
                var obj = _context.WorkDays.FirstOrDefault(x => x.Weekday == b.Weekday);
                if (obj != null)
                {
                    obj.IsOn = b.IsOn;
                }
                else
                {
                    _context.WorkDays.Add(b);
                }
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE: api/Workdays/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Workday>> DeleteWorkday(int id)
        {
            var workday = await _context.WorkDays.FindAsync(id);
            if (workday == null)
            {
                return NotFound();
            }

            _context.WorkDays.Remove(workday);
            await _context.SaveChangesAsync();

            return workday;
        }

        private bool WorkdayExists(int id)
        {
            return _context.WorkDays.Any(e => e.WorkdayId == id);
        }
    }
}
