using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SmartHR.DataApi.Models.Identity;
using SmartHR.DataApi.ViewModels.Indentity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SmartHR.DataApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration config;
        private readonly ApplicationDbContext db;
        public AccountController(UserManager<IdentityUser> userManager, IConfiguration config, ApplicationDbContext db)
        {
            this.userManager = userManager;
            this.config = config;
            this.db = db;
        }
        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            //Thread.Sleep(2000);
            var user = await userManager.FindByNameAsync(model.Username.ToUpper());

            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var roles = await userManager.GetRolesAsync(user);
                var signingKey =
                  Encoding.UTF8.GetBytes(config["Jwt:SigningKey"]);
                var expiryDuration = int.Parse(config["Jwt:ExpiryInMinutes"]);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = null,              // Not required as no third-party is involved
                    Audience = null,            // Not required as no third-party is involved
                    IssuedAt = DateTime.UtcNow,
                    NotBefore = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddMinutes(expiryDuration),
                    Subject = new ClaimsIdentity(new List<Claim> {
                        new Claim("username",user.UserName),
                        new Claim("role",string.Join(',',roles))
                    }
                    ),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(signingKey), SecurityAlgorithms.HmacSha256Signature)
                };
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
                var token = jwtTokenHandler.WriteToken(jwtToken);
                return Ok(
                  new
                  {
                      token = token,
                      expiration = jwtToken.ValidTo,
                      refreshToken = user.Id
                  });
            }
            return BadRequest("Login failed, Username or password incorrect.");
        }
        [Route("register")]
        [HttpPost]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            var user = new IdentityUser
            {
                Email = model.Email,
                UserName = model.Username,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Staff");
            }
            return Ok(new { Username = user.UserName, Role = "Staff" });
        }
        [Route("admin/register")]
        [HttpPost]
        public async Task<ActionResult> RegisterAdmin(RegisterViewModel model)
        {
            var user = new IdentityUser
            {
                Email = model.Email,
                UserName = model.Username,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Admin");
            }
            return Ok(new { Username = user.UserName, Role = "Admin" });
        }
    }
}
