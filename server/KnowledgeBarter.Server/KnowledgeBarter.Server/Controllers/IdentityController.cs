using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace KnowledgeBarter.Server.Controllers
{
    public class IdentityController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ApplicationSettings appSettings;

        public IdentityController(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> options)
        {
            this.userManager = userManager;
            this.appSettings = options.Value;
        }

        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterInputModel model)
        {
            var user = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Username,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [Route(nameof(Login))]
        public async Task<ActionResult<string>> Login(LoginInputModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.Username);

            if (user == null)
            {
                return Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.UserName),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var encriptedToken = tokenHandler.WriteToken(token);

            return encriptedToken;
        }
    }
}
