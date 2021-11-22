using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Data.Models;


namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryPaysController : ControllerBase
    {
        private readonly HRDbContext _context;

        public SalaryPaysController(HRDbContext context)
        {
            _context = context;
        }

        // GET: api/SalaryPays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalaryPay>>> GetSalaryPays()
        {
            return await _context.SalaryPays.ToListAsync();
        }

        // GET: api/SalaryPays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalaryPay>> GetSalaryPay(int id)
        {
            var salaryPay = await _context.SalaryPays.FindAsync(id);

            if (salaryPay == null)
            {
                return NotFound();
            }

            return salaryPay;
        }

        // PUT: api/SalaryPays/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalaryPay(int id, SalaryPay salaryPay)
        {
            if (id != salaryPay.SalaryPayId)
            {
                return BadRequest();
            }

            _context.Entry(salaryPay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryPayExists(id))
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

        // POST: api/SalaryPays
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SalaryPay>> PostSalaryPay(SalaryPay salaryPay)
        {
            _context.SalaryPays.Add(salaryPay);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalaryPay", new { id = salaryPay.SalaryPayId }, salaryPay);
        }

        // DELETE: api/SalaryPays/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalaryPay>> DeleteSalaryPay(int id)
        {
            var salaryPay = await _context.SalaryPays.FindAsync(id);
            if (salaryPay == null)
            {
                return NotFound();
            }

            _context.SalaryPays.Remove(salaryPay);
            await _context.SaveChangesAsync();

            return salaryPay;
        }
        [HttpGet("Status/{y}/{m}")]
        public async Task<ActionResult<bool>> IsSaved(int y, int m)
        {
            var p = await _context.SalaryPays.FirstOrDefaultAsync(x => x.Year == y & x.Month == m);
            if (p == null)
                return false;
            else
                return true;
        }
        [HttpGet("Date/{y}/{m}")]
        public async Task<ActionResult<DateTime>> GetPayDate(int y, int m)
        {
            var p = await _context.SalaryPays.FirstOrDefaultAsync(x => x.Year == y & x.Month == m);
            if (p == null)
                return null;
            else
                return p.PaymentDate;
        }
        private bool SalaryPayExists(int id)
        {
            return _context.SalaryPays.Any(e => e.SalaryPayId == id);
        }
    }
}
