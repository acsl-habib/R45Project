using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;
using SmartHR.DataApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class DbMigrationsController : ControllerBase
    {
        private readonly HRDbContext db;
        
        public DbMigrationsController(HRDbContext db) { this.db = db; }
        [HttpGet("DbStatus")]
        public async Task<ActionResult<bool>> DbInitiated()
        {
            return await db.Database.CanConnectAsync();

        }
        [HttpPost("Init")]
        public async Task<ActionResult> InitDb()
        {
            await db.GetInfrastructure().GetService<IMigrator>().MigrateAsync("hr_0");
            string[] dayNames = Enum.GetNames(typeof(DayOfWeek));
            foreach(var d in dayNames)
            {
                await db.WorkDays.AddAsync(new Workday { Weekday = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), d), IsOn = false });
            }
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
