using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SmartHR.DataApi.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Migrations.Identity
{
    public class IdentityDbInitializer
    {
        private readonly ApplicationDbContext db;
        public IdentityDbInitializer(ApplicationDbContext db) { this.db = db; }
        public async void Seed()
        {
            string[] roles = { "Admin", "Staff" };
            foreach (string r in roles)
            {
                if (!db.Roles.Any(x => x.Name == r))
                {
                    db.Roles.Add(new IdentityRole { 
                        Name = r, NormalizedName = r.ToUpper() });
                }
            }
            var userStore = new UserStore<IdentityUser>(db);
            var hasher = new PasswordHasher<IdentityUser>();
            if (!db.Users.Any(x => x.UserName == "Admin"))
            {
               
                var user = new IdentityUser { UserName = "admin", NormalizedUserName = "ADMIN" };
                user.PasswordHash = hasher.HashPassword(user, "@Open1234");
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, "Admin");

            }
            if (!db.Users.Any(x => x.UserName == "ESADR45"))
            {
                
                var user = new IdentityUser { UserName = "ESADR45", NormalizedUserName = "ESADR45" };
                user.PasswordHash = hasher.HashPassword(user, "@Open1234");
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, "Staff");

            }
            await db.SaveChangesAsync();

        }
    }
}
