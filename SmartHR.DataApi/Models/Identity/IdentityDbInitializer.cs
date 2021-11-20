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
        //private readonly ApplicationDbContext db;
        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public IdentityDbInitializer(/*ApplicationDbContext db,*/ UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager) 
        { 
            //this.db = db;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }
        public async Task SeedAsync()
        {


            await CreateRoleAsync(new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" });
            await CreateRoleAsync(new IdentityRole { Name = "Staff", NormalizedName = "STAFF" });

            var hasher = new PasswordHasher<IdentityUser>();
            var user = new IdentityUser { UserName = "admin", NormalizedUserName = "ADMIN" };
            user.PasswordHash = hasher.HashPassword(user, "@Open1234");
            await CreateUserAsync(user);
            await userManager.AddToRoleAsync(user,"Admin");
            
            user = new IdentityUser { UserName = "esadr45", NormalizedUserName = "ESADR45" };
            user.PasswordHash = hasher.HashPassword(user, "@Open1234");
            await CreateUserAsync(user);
            await userManager.AddToRoleAsync(user, "Staff");

            //await db.SaveChangesAsync();
        }
        private async Task CreateRoleAsync(IdentityRole role)
        {
            var exits = await roleManager.RoleExistsAsync(role.Name);
            if (!exits)
                await roleManager.CreateAsync(role);
        }
        private async Task CreateUserAsync(IdentityUser user)
        {
            var exists = await userManager.FindByNameAsync(user.UserName);
            if (exists == null)
                await userManager.CreateAsync(user);
        }
    }
}
