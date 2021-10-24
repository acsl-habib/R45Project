using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Models.Data;

namespace SmartHR.DataApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class LeaveApplicationsController : ControllerBase
    {
        private readonly HRDbContext _context;

        public LeaveApplicationsController(HRDbContext context)
        {
            _context = context;
        }

        // GET: api/LeaveApplications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveApplication>>> GetLeaveApplications()
        {
            return await _context.LeaveApplications.ToListAsync();
        }

        // GET: api/LeaveApplications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveApplication>> GetLeaveApplication(int id)
        {
            var leaveApplication = await _context.LeaveApplications.FindAsync(id);

            if (leaveApplication == null)
            {
                return NotFound();
            }

            return leaveApplication;
        }

        // PUT: api/LeaveApplications/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaveApplication(int id, LeaveApplication leaveApplication)
        {
            if (id != leaveApplication.LeaveApplicationId)
            {
                return BadRequest();
            }

            _context.Entry(leaveApplication).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveApplicationExists(id))
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

        // POST: api/LeaveApplications
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LeaveApplication>> PostLeaveApplication(LeaveApplication leaveApplication)
        {
            _context.LeaveApplications.Add(leaveApplication);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeaveApplication", new { id = leaveApplication.LeaveApplicationId }, leaveApplication);
        }

        // DELETE: api/LeaveApplications/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LeaveApplication>> DeleteLeaveApplication(int id)
        {
            var leaveApplication = await _context.LeaveApplications.FindAsync(id);
            if (leaveApplication == null)
            {
                return NotFound();
            }

            _context.LeaveApplications.Remove(leaveApplication);
            await _context.SaveChangesAsync();

            return leaveApplication;
        }
        /*
         * Masud
         * 
         * */
        [HttpGet("Pending")]
        public async Task<ActionResult<IEnumerable<LeaveApplication>>> GetPending()
        {
            return await _context.LeaveApplications
                .Where(x => x.Status == Models.Constants.LeaveStatus.Pending)
                .ToListAsync();
        }
        /*
         * Masud
         * 
         * */
        [HttpGet("Approve/{id}")]
        public async Task<ActionResult> Approve(int id)
        {
            var application = await _context.LeaveApplications.FirstOrDefaultAsync(x => x.LeaveApplicationId == id);
            if(application != null)
            {
                application.Status = Models.Constants.LeaveStatus.Approved;
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
        private bool LeaveApplicationExists(int id)
        {
            return _context.LeaveApplications.Any(e => e.LeaveApplicationId == id);
        }
    }
}
