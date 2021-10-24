using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin,Staff")]
    public class DepartmentsController : ControllerBase
    {
        private readonly HRDbContext _context;

        public DepartmentsController(HRDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
           
            return await _context.Departments.ToListAsync();
        }

     
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetWorkday(int id)
        {
            var workday = await _context.Departments.FindAsync(id);

            if (workday == null)
            {
                return NotFound();
            }

            return workday;
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkday(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
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
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkday", new { id = department.DepartmentId }, department);
        }
        
   
        [HttpDelete("{id}")]
        public async Task<ActionResult<Department>> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return department;
        }
        // api/Department/1/Employees
        [HttpGet("{id}/Employees")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees(int id /* dept id*/)
        {
            return await _context.Employees.Where(x => x.DepartmentId == id).ToListAsync();
        }
        private bool DepartmentExists(int id)
        {
            return _context.Workdays.Any(e => e.WorkdayId == id);
        }
    }
}
