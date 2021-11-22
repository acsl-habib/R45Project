using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Data.Models;
using SmartHR.DataApi.Models.Constants;
using SmartHR.DataApi.ViewModels.Data;

namespace SmartHR.DataApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkHoursController : ControllerBase
    {
        private readonly HRDbContext _context;

        public WorkHoursController(HRDbContext context)
        {
            _context = context;
        }

        // GET: api/WorkHours
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkHour>>> GetWorkHours()
        {
            return await _context.WorkHours.ToListAsync();
        }
        /*
         * Custom
         * 
         * */
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<WorkHourViewModel>>> GetWorkHourViewModels()
        {
            return await _context
                            .WorkHours
                            .Select(w => new WorkHourViewModel
                            {
                                OfficeHourType = w.OfficeHourType,
                                WorkHourId = w.WorkHourId,
                                StartTime = DateTime.Today.Add(w.StartTime),
                                LeaveTime = DateTime.Today.Add(w.LeaveTime),
                                BreakDuration = w.BreakDuration
                            })
                            .ToListAsync();
        }
        [HttpGet("VM/{type}")]
        public async Task<ActionResult<IEnumerable<WorkHourViewModel>>> GetWorkHourViewModelsByType(OfficeHourType type)
        {
            var w = await _context
                            .WorkHours
                            .Where(w => w.OfficeHourType == type)
                            .Select(w => new WorkHourViewModel
                            {
                                WorkHourId = w.WorkHourId,
                                StartTime = DateTime.Today.Add(w.StartTime),
                                LeaveTime = DateTime.Today.Add(w.LeaveTime),
                                BreakDuration = w.BreakDuration,
                                OfficeHourType = w.OfficeHourType

                            })
                            .ToListAsync();

            return w;

        }
        // GET: api/WorkHours/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkHour>> GetWorkHour(int id)
        {
            var workHour = await _context.WorkHours.FindAsync(id);

            if (workHour == null)
            {
                return NotFound();
            }

            return workHour;
        }

        // PUT: api/WorkHours/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkHour(int id, WorkHour workHour)
        {
            if (id != workHour.WorkHourId)
            {
                return BadRequest();
            }

            _context.Entry(workHour).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkHourExists(id))
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

        // POST: api/WorkHours
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WorkHour>> PostWorkHour(WorkHour workHour)
        {
            _context.WorkHours.Add(workHour);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkHour", new { id = workHour.WorkHourId }, workHour);
        }
        /*
         * Custom
         * 
         * */
        [HttpPost("Alt")]
        public async Task<ActionResult<WorkHourViewModel>> PostWorkHourVM(WorkHourViewModel workHour)
        {

            var hs = workHour.StartTime.Hour;
            var ms = workHour.StartTime.Minute;
            var hl = workHour.LeaveTime.Hour;
            var ml = workHour.LeaveTime.Minute;
            var hb = workHour.BreakTime.Hour;
            var mb = workHour.BreakTime.Minute;
            var w = await _context.WorkHours.FirstOrDefaultAsync(x => x.OfficeHourType == workHour.OfficeHourType);
            if (w == null)
            {

                w = new WorkHour
                {
                    OfficeHourType = workHour.OfficeHourType,
                    StartTime = new TimeSpan(hs, ms, 0),
                    LeaveTime = new TimeSpan(hl, ml, 0),
                    BreakTime = new TimeSpan(hb, mb, 0),
                    BreakDuration = workHour.BreakDuration
                };
                _context.WorkHours.Add(
                    w
                    );
            }
            else
            {
                w.StartTime = new TimeSpan(hs, ms, 0);
                w.LeaveTime = new TimeSpan(hl, ml, 0);
                w.BreakTime = new TimeSpan(hb, mb, 0);
                w.BreakDuration = workHour.BreakDuration;
                w.OfficeHourType = workHour.OfficeHourType;
            }
            await _context.SaveChangesAsync();
            workHour.WorkHourId = w.WorkHourId;
            return workHour;
        }
        // DELETE: api/WorkHours/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkHour>> DeleteWorkHour(int id)
        {
            var workHour = await _context.WorkHours.FindAsync(id);
            if (workHour == null)
            {
                return NotFound();
            }

            _context.WorkHours.Remove(workHour);
            await _context.SaveChangesAsync();

            return workHour;
        }

        private bool WorkHourExists(int id)
        {
            return _context.WorkHours.Any(e => e.WorkHourId == id);
        }
    }
}
