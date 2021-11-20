﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartHR.DataApi.Models.Data;
using SmartHR.DataApi.ViewModels.Input;

namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class DepartmentsController : ControllerBase
    {
        private readonly HRDbContext _context;

        public DepartmentsController(HRDbContext context)
        {
            _context = context;
        }

        // GET: api/Departments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }
        /*
         * Custom to get department of an employee
         * 
         * */
        [HttpGet("Employee/{id}")]
        public async Task<ActionResult<Department>> GetEmployeeDepartment(int id)
        {
            var emp = await _context.Employees.Include(x=> x.Section).FirstOrDefaultAsync(x=> id== x.EmployeeId);

            if (emp == null)
            {
                return NotFound();
            }
            var section = await _context.Sections.Include(x => x.Department).FirstOrDefaultAsync(x => x.SectionId == emp.SectionId);
           
            return section?.Department;
        }
        /*
         * Custom to get single dept + sections
         * 
         * */
        [HttpGet("{id}/WithSections")]
        public async Task<ActionResult<Department>> GetDepartmentWithSections(int id)
        {
            var department = await _context.Departments.Include(x=> x.Sections).FirstOrDefaultAsync(x=> x.DepartmentId == id);

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }
        /*
         * Custom to department with sections
         * 
         */
        [HttpGet("WithSections")]
        public async Task<IEnumerable<Department>> GetDepartmentsWithSections()
        {
            return await _context
                .Departments
                .Include(x => x.Sections)
                .ToListAsync();
        }
        // PUT: api/Departments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, Department department)
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
        [HttpPut("{id}/WithSections")]
        public async Task<IActionResult> PutDepartment(int id, DepartmentInputModel data)
        {
            if (id != data.DepartmentId)
            {
                return BadRequest();
            }
            var dept =await _context.Departments.Include(x=> x.Sections).FirstOrDefaultAsync(x => x.DepartmentId == id);
            if(dept == null)
            {
                return NotFound();
            }
            dept.DepartmentName = data.DepartmentName;
            await this.DeleteSections(dept.Sections.ToList());
            foreach(var s in data.Sections)
            {
                dept.Sections.Add(new Section { SectionName = s });
            }
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
        // POST: api/Departments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);
        }
        /*
         * Custom to save dept &price
         * ===========================
         * */
        [HttpPost("WithSection")]
        public async Task<ActionResult<Department>> PostDepartmentWithSection(DepartmentInputModel data)
        {
            var department = new Department
            {
                DepartmentName = data.DepartmentName
            };
            foreach(var s in data.Sections)
            {
                department.Sections.Add(new Section { SectionName = s });
            }
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);
        }
        // DELETE: api/Departments/5
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
        private async Task DeleteSections(IEnumerable<Section> sections)
        {
            foreach(var s in sections)
            {
                _context.Entry(s).State = EntityState.Deleted;
            }
            await _context.SaveChangesAsync();
        }
        private bool DepartmentExists(int id)
        {
            return _context.Departments.Any(e => e.DepartmentId == id);
        }
    }
}
