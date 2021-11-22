using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;
using SmartHR.DataApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class DbMigrationsController : ControllerBase
    {
        private readonly HRDbContext db;
        
        public DbMigrationsController(HRDbContext db) { this.db = db; }
        private readonly Dictionary<string, string> keys = new Dictionary<string, string>()
        {
            {"Smart HR", "4B16ED20-0FE1-4C05-A4B5-57DCE557C90D" }
        };
        [HttpGet("DbStatus")]
        public async Task<ActionResult<bool>> DbInitiated()
        {
            return await db.Database.CanConnectAsync();

        }
        [HttpPost("Init")]
        public async Task<ActionResult> InitDb()
        {
            await db.GetInfrastructure().GetService<IMigrator>().MigrateAsync("hr_1");
            string[] dayNames = Enum.GetNames(typeof(DayOfWeek));
            foreach(var d in dayNames)
            {
                await db.WorkDays.AddAsync(new Workday { Weekday = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), d), IsOn = false });
            }
            foreach (var k in keys)
            {
                db.Companies.Add(new Company { CompanyName = k.Key, AccessKey = k.Value });
            }
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
