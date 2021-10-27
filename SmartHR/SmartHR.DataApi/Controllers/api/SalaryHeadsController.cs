using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Models.Data;

namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class SalaryHeadsController : ControllerBase
    {
        private readonly HRDbContext _context;

        public SalaryHeadsController(HRDbContext context)
        {
            _context = context;
        }

        // GET: api/SalaryHeads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalaryHead>>> GetSalaryHeads()
        {
            return await _context.SalaryHeads.ToListAsync();
        }

        // GET: api/SalaryHeads/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalaryHead>> GetSalaryHead(int id)
        {
            var salaryHead = await _context.SalaryHeads.FindAsync(id);

            if (salaryHead == null)
            {
                return NotFound();
            }

            return salaryHead;
        }
        /*
         * Custom
         * 
         * */
        [HttpGet("Labels")]
        public async Task<ActionResult<IEnumerable<string>>> GetSalaryHeadLabels()
        {
            return await _context
                .SalaryHeads
                .Select(x => x.SalaryHeadName)
                .ToListAsync();
        }
        // PUT: api/SalaryHeads/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalaryHead(int id, SalaryHead salaryHead)
        {
            if (id != salaryHead.SalaryHeadId)
            {
                return BadRequest();
            }

            _context.Entry(salaryHead).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryHeadExists(id))
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

        // POST: api/SalaryHeads
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SalaryHead>> PostSalaryHead(SalaryHead salaryHead)
        {
            _context.SalaryHeads.Add(salaryHead);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalaryHead", new { id = salaryHead.SalaryHeadId }, salaryHead);
        }

        // DELETE: api/SalaryHeads/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalaryHead>> DeleteSalaryHead(int id)
        {
            var salaryHead = await _context.SalaryHeads.FindAsync(id);
            if (salaryHead == null)
            {
                return NotFound();
            }

            _context.SalaryHeads.Remove(salaryHead);
            await _context.SaveChangesAsync();

            return salaryHead;
        }

        private bool SalaryHeadExists(int id)
        {
            return _context.SalaryHeads.Any(e => e.SalaryHeadId == id);
        }
    }
}
