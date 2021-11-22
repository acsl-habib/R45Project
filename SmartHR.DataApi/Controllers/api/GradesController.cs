using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Data.Models;
using SmartHR.DataApi.ViewModels.Edit;
using SmartHR.DataApi.ViewModels.Input;

namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles ="Admin")]
    public class GradesController : ControllerBase
    {
        private readonly HRDbContext _context;

        public GradesController(HRDbContext context)
        {
            _context = context;
        }

        // GET: api/Grades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grade>>> GetGrades()
        {
            return await _context.Grades.ToListAsync();
        }
        /*
         * Custom
         * 
         * */
        [HttpGet("Include")]
        public async Task<ActionResult<IEnumerable<Grade>>> GetGradesWthChild()
        {
            return await _context
                .Grades
                .Include(x=> x.SalaryStructures)
                .ToListAsync();
        }
        
        // GET: api/Grades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grade>> GetGrade(int id)
        {
            var grade = await _context.Grades.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            return grade;
        }
        [HttpGet("{id}/Include")]
        public async Task<ActionResult<Grade>> GetGradeInclude(int id)
        {
            return await _context.Grades
                .Include(x => x.SalaryStructures)
                .ThenInclude(x => x.SalaryHead)
                .FirstOrDefaultAsync(x => x.GradeId == id);
        }
        /*
         * Custom to get employees holding a grade
         * 
         * */
        [HttpGet("{id}/Employees")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeOfGrade(int id)
        {
            return await _context
                .Employees
                .Where(x => x.CurrentGradeId == id)
                .ToListAsync();
        }
        /*
         * 
         * custom to return grade editable format
         */
        [HttpGet("{id}/Edit")]
        public async Task<ActionResult<GradeEditModel>> GetGradeEditModel(int id)
        {
            var grade = await _context.Grades
                .Include(x => x.SalaryStructures)
                .ThenInclude(y=>y.SalaryHead)
                .FirstOrDefaultAsync(x => x.GradeId == id);

            if (grade == null)
            {
                return NotFound();
            }
            var ss = grade.SalaryStructures.Select(s =>
                new SalaryStructureEditModel
                {
                    SalaryStructureId = s.SalaryStructureId,
                    Label = s.SalaryHead.SalaryHeadName,
                    HeadValue = (decimal)s.HeadValue,
                    ValueCalculationType = s.ValueCalculationType
                }).ToArray();
            return new GradeEditModel
            {
                GradeId = grade.GradeId,
                GradeName = grade.GradeName,
                Basic = grade.Basic,
                SalaryStructures = ss
            };
        }
        // PUT: api/Grades/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrade(int id, Grade grade)
        {
            if (id != grade.GradeId)
            {
                return BadRequest();
            }

            _context.Entry(grade).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeExists(id))
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
       
        // POST: api/Grades
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Grade>> PostGrade(Grade grade)
        {
            _context.Grades.Add(grade);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGrade", new { id = grade.GradeId }, grade);
        }
        /*
         * Custom
         * 
         * */
        [HttpPost("{id}/Array")]
        public async Task<ActionResult> PostSalaryStructure(
            int id //grade id
            , SalaryStructureInputModel[] salaryStructures
            )
        {
            var grade = await _context.Grades.FirstOrDefaultAsync(x => x.GradeId == id);
            if(grade == null)
            {
                return NotFound();
            }
            foreach(var s in salaryStructures)
            {
                var head = await _context.SalaryHeads.FirstOrDefaultAsync(x => x.SalaryHeadName.ToLower() == s.Label.ToLower());
                if(head == null)
                {
                    var h = await this.AddNewHead(s);
                    grade.SalaryStructures.Add(new SalaryStructure { SalaryHeadId = h.SalaryHeadId, ValueCalculationType = s.ValueCalculationType, HeadValue = (double)s.HeadValue });
                }
                else
                {
                    grade.SalaryStructures.Add(new SalaryStructure { SalaryHeadId = head.SalaryHeadId, ValueCalculationType = s.ValueCalculationType, HeadValue = (double)s.HeadValue });
                }
            }
            await _context.SaveChangesAsync();
            return Ok();
            
        }
        // DELETE: api/Grades/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Grade>> DeleteGrade(int id)
        {
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null)
            {
                return NotFound();
            }

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();

            return grade;
        }
        //custom method for salay head
        private async Task<SalaryHead> AddNewHead(SalaryStructureInputModel data)
        {
            var head = new SalaryHead { SalaryHeadName = data.Label, Description = data.Label, IsCommon = false };
            _context.SalaryHeads.Add(head);
            await _context.SaveChangesAsync();
            return head;
        }

        /*
         * custom delete method
         */
        
        private bool GradeExists(int id)
        {
            return _context.Grades.Any(e => e.GradeId == id);
        }
    }
}
