using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Identity;
using KnowledgeBarter.Server.Services.Contracts;
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
        private readonly IIdentityService identityService;
        private readonly IImageService imageService;

        public IdentityController(UserManager<ApplicationUser> userManager,
            IOptions<ApplicationSettings> options,
            IIdentityService identityService,
            IImageService imageService)
        {
            this.userManager = userManager;
            this.appSettings = options.Value;
            this.identityService = identityService;
            this.imageService = imageService;
        }

        /// <summary>
        /// Registers a new user with the given email, username, password, and image url.
        /// </summary>
        /// <param name="model">Input model for registration</param>
        /// <returns>An HTTP status code indicating the result of the registration request.</returns>
        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register([FromForm] RegisterInputModel model)
        {
            var image = await this.imageService.CreateAsync(model.Image);
            var user = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Username,
                KBPoints = 0,
                Image = image,
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        /// <summary>
        /// Attempts to log in a user with the given username and password.
        /// </summary>
        /// <param name="model">Input model for login</param>
        /// <returns>An HTTP status code and a JWT token indicating the result of the login attempt.</returns>
        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginInputModel model)
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

            var token = this.identityService.GenerateJwtToken(
                user.Id.ToString(),
                user.UserName,
                this.appSettings.Secret);

            return new LoginResponseModel()
            {
                AccessToken = token,
                KBPoints = user.KBPoints,
                Username = user.UserName,
                Email = user.Email,
                _Id = user.Id,
            };
        }
    }
}
