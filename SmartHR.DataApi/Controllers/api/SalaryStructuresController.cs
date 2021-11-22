using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Data.Models;
using SmartHR.DataApi.ViewModels.Edit;

namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryStructuresController : ControllerBase
    {
        private readonly HRDbContext _context;

        public SalaryStructuresController(HRDbContext context)
        {
            _context = context;
        }

        // GET: api/SalaryStructures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalaryStructure>>> GetSalaryStructures()
        {
            return await _context.SalaryStructures.ToListAsync();
        }

        // GET: api/SalaryStructures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalaryStructure>> GetSalaryStructure(int id)
        {
            var salaryStructure = await _context.SalaryStructures.FindAsync(id);

            if (salaryStructure == null)
            {
                return NotFound();
            }

            return salaryStructure;
        }

        // PUT: api/SalaryStructures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalaryStructure(int id, SalaryStructure salaryStructure)
        {
            if (id != salaryStructure.SalaryStructureId)
            {
                return BadRequest();
            }

            _context.Entry(salaryStructure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryStructureExists(id))
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

        // POST: api/SalaryStructures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SalaryStructure>> PostSalaryStructure(SalaryStructure salaryStructure)
        {
            _context.SalaryStructures.Add(salaryStructure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalaryStructure", new { id = salaryStructure.SalaryStructureId }, salaryStructure);
        }
        [HttpPost("{id}/EditModel")]
        public async Task<ActionResult<SalaryStructure>> PostSalaryStructureEditModel(int id, SalaryStructureEditModel data)
        {
            var salaryHead = await _context.SalaryHeads.FirstOrDefaultAsync(x => x.SalaryHeadName.ToLower() == data.Label.ToLower());
            var salaryStructure = await _context.SalaryStructures.FirstOrDefaultAsync(x => x.SalaryStructureId == data.SalaryStructureId);
            
            if(salaryHead == null)
            {
                salaryHead = await this.CreatHaed(data);
               
            }
            if(salaryStructure == null)
            {
                salaryStructure = new SalaryStructure { GradeId = id, SalaryHeadId = salaryHead.SalaryHeadId, HeadValue = (double)data.HeadValue, ValueCalculationType = data.ValueCalculationType };
                _context.SalaryStructures.Add(salaryStructure);
            }
            else
            {
                salaryStructure.SalaryHeadId = salaryHead.SalaryHeadId;
                salaryStructure.HeadValue = (double)data.HeadValue;
                salaryStructure.ValueCalculationType = data.ValueCalculationType;
            }
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetSalaryStructure", new { id = salaryStructure.SalaryStructureId }, salaryStructure);
        }

        // DELETE: api/SalaryStructures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalaryStructure>> DeleteSalaryStructure(int id)
        {
            var salaryStructure = await _context.SalaryStructures.FindAsync(id);
            if (salaryStructure == null)
            {
                return NotFound();
            }

            _context.SalaryStructures.Remove(salaryStructure);
            await _context.SaveChangesAsync();

            return salaryStructure;
        }
        private async Task<SalaryHead> CreatHaed(SalaryStructureEditModel data)
        {
            SalaryHead head = new SalaryHead { SalaryHeadName = data.Label, Description = data.Label, IsCommon = false };
            await _context.SalaryHeads.AddAsync(head);
            await _context.SaveChangesAsync();
            return head;
        }
        private bool SalaryStructureExists(int id)
        {
            return _context.SalaryStructures.Any(e => e.SalaryStructureId == id);
        }
    }
}
