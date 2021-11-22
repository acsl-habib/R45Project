using SmartHR.DataApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Models.Data
{
    public class HRDbInitializer
    {
        private readonly HRDbContext db;
        private readonly Dictionary<string, string> keys = new Dictionary<string, string>()
        {
            {"Smart HR", "4B16ED20-0FE1-4C05-A4B5-57DCE557C90D" }
        };
        public HRDbInitializer(HRDbContext db) { this.db = db; }
        public async Task SeedAsync()
        {
            if (!this.db.Companies.Any())
            {
                foreach (var k in keys)
                {
                    db.Companies.Add(new Company { CompanyName = k.Key, AccessKey = k.Value });
                }
            }

           


            await db.SaveChangesAsync();
        }
    }
}
