using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;
using SmartHR.DataApi.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly HRDbContext db;
        private readonly Dictionary<string, string> keys = new Dictionary<string, string>()
        {
            {"Smart HR", "4B16ED20-0FE1-4C05-A4B5-57DCE557C90D" }
        };
        public SettingsController(HRDbContext db) { this.db = db; }
        [HttpGet("DbStatus")]
        public async Task<ActionResult<bool>> DbInitiated()
        {
            return await db.Database.CanConnectAsync();
            
        }
        [HttpPost("Init")]
        public async Task<ActionResult> InitDb()
        {
            await db.GetInfrastructure().GetService<IMigrator>().MigrateAsync("hr_v7");
            foreach(var k in keys)
            {
                db.Companies.Add(new Company { CompanyName = k.Key, AccessKey = k.Value });
            }
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}
