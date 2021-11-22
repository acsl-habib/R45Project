using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartHR.DataApi.Data.Models;
using SmartHR.DataApi.ViewModels.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly HRDbContext _context;

        public SalaryController(HRDbContext context)
        {
            _context = context;
        }
        [HttpGet("salary")]
        public List<SalaryVM> GetSalary()
        {

            var data = (from e in _context.Employees
                        join a in _context.Attendances on e.EmployeeId equals a.EmployeeId
                        join g in _context.Grades on e.CurrentGradeId equals g.GradeId
                        join d in _context.Designations on e.CurrentDesignationId equals d.DesignationId
                        //where a.InTime.Month == month && a.InTime.Year == year

                        select new SalaryVM()
                        {
                            EmployeeId = e.EmployeeId,
                            EmployeeName = e.EmployeeName,
                            Designation = d.DesignationName,
                            Grade = g.GradeName,
                            Basic = g.Basic,
                            Year = a.InTime.Year,
                            Month = a.InTime.Month

                        }).ToList();
            return data;
        }

    }
}
