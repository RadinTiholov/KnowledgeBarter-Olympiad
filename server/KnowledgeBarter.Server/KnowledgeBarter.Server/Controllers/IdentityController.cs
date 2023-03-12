using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Infrastructure;
using KnowledgeBarter.Server.Infrastructure.Extensions;
using KnowledgeBarter.Server.Models.Identity;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using static KnowledgeBarter.Server.Infrastructure.WebConstants;


namespace KnowledgeBarter.Server.Controllers
{
    public class IdentityController : ApiController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ApplicationSettings appSettings;
        private readonly IIdentityService identityService;
        private readonly IImageService imageService;
        private readonly IMessageService messageService;

        public IdentityController(UserManager<ApplicationUser> userManager,
            IOptions<ApplicationSettings> options,
            IIdentityService identityService,
            IImageService imageService,
            IMessageService messageService)
        {
            this.userManager = userManager;
            this.appSettings = options.Value;
            this.identityService = identityService;
            this.imageService = imageService;
            this.messageService = messageService;
        }

        /// <summary>
        /// Registers a new user with the given email, username, password, and image url.
        /// </summary>
        /// <param name="model">Input model for registration</param>
        /// <returns>An HTTP status code indicating the result of the registration request.</returns>
        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult<RegisterResponseModel>> Register([FromForm] RegisterInputModel model)
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
                var role = await this.GetCurrentRole(user);

                var token = this.identityService.GenerateJwtToken(
                user.Id.ToString(),
                user.UserName,
                role,
                this.appSettings.Secret);

                return new RegisterResponseModel()
                {
                    AccessToken = token,
                    KBPoints = user.KBPoints,
                    Username = user.UserName,
                    Email = user.Email,
                    Role = role,
                    _id = user.Id,
                };
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

            var role = await this.GetCurrentRole(user);

            var token = this.identityService.GenerateJwtToken(
                user.Id.ToString(),
                user.UserName,
                role,
                this.appSettings.Secret);

            return new LoginResponseModel()
            {
                AccessToken = token,
                KBPoints = user.KBPoints,
                Username = user.UserName,
                Email = user.Email,
                Role = role,
                _id = user.Id,
            };
        }

        /// <summary>
        /// Get profile of a user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Bad request error if the request is invalid or the user profile information</returns>
        [HttpGet]
        [Authorize]
        [Route(IdentityProfileRoute)]
        public async Task<IdentityProfileResponseModel> Profile(string userId)
        {
            var response = await this.identityService.GetIdentityProfileAsync(userId);

            return response;
        }

        /// <summary>
        /// Get profile of a user
        /// </summary>
        /// <param name="lessonId"></param>
        /// <returns>Bad request error if the request is invalid or the user profile information</returns>
        [HttpGet]
        [Route(UserInformationRoute)]
        public async Task<ActionResult<UserInformationResponseModel>> UserInformation(string userId)
        {
            var user = await this.identityService.GetUserInformationAsync(userId);

            if (user == null)
            {
                return BadRequest();
            }

            return user;
        }

        /// <summary>
        /// Get all profiles
        /// </summary>
        /// <returns>All profiles</returns>
        [HttpGet]
        [Route(AllProfilesRoute)]
        public async Task<IEnumerable<ProfilesInListResponseModel>> AllProfiles()
        {
            var profiles = await this.identityService.GetAllProfilesAsync();

            return profiles;
        }

        /// <summary>
        /// Get all contacts
        /// </summary>
        /// <returns>All contacts</returns>
        [HttpGet]
        [Authorize]
        [Route(AllContactsRoute)]
        public async Task<IEnumerable<string>> AllContacts()
        {
            var user = await this.identityService.GetUserAsync(this.User.Id());

            return await this.messageService.GetDistinctContactsAsync(user.UserName);
        }

        private async Task<string> GetCurrentRole(ApplicationUser user)
        {
            var roles = (List<string>)await this.userManager.GetRolesAsync(user);
            return roles.Count > 0 ? roles[0].ToLower() : "User";
        }
    }
}
