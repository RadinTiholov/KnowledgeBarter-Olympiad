using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Identity;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static KnowledgeBarter.Server.Data.Common.DataValidation;

namespace KnowledgeBarter.Server.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly IRepository<ApplicationUser> applicationUserRepository;
        private readonly UserManager<ApplicationUser> userManager;

        public IdentityService(IRepository<ApplicationUser> applicationUserRepository,
            UserManager<ApplicationUser> userManager)
        {
            this.applicationUserRepository = applicationUserRepository;
            this.userManager = userManager;
        }

        public string GenerateJwtToken(string userId, string username, string role, string secret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, userId),
                    new Claim(ClaimTypes.NameIdentifier, username),
                    new Claim(ClaimTypes.Role, role),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }
        public async Task UpdatePoints(string userId, int points)
        {
            var user = await this.GetUserAsync(userId);

            user.KBPoints += points;

            this.applicationUserRepository.Update(user);
            await this.applicationUserRepository.SaveChangesAsync();
        }

        public async Task<ApplicationUser> GetUserAsync(string userId)
        {
            var user = await this.applicationUserRepository
                .All()
                .Where(x => x.Id == userId)
                .Include(x => x.LikedLessons)
                .Include(x => x.LikedCourses)
                .Include(x => x.BoughtLessons)
                .Include(x => x.BoughtCourses)
                    .ThenInclude(bc => bc.Lessons)
                .Include(x => x.OwnLessons)
                .Include(x => x.OwnCourses)
                .Include(x => x.Image)
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task SubtractPointsAsync(string userId, int points)
        {
            var user = await this.GetUserAsync(userId);

            user.KBPoints = user.KBPoints - points;

            this.applicationUserRepository.Update(user);
            await this.applicationUserRepository.SaveChangesAsync();
        }

        public async Task<IdentityProfileResponseModel> GetIdentityProfileAsync(string userId)
        {
            var user = await this.GetUserAsync(userId);

            var profile = new IdentityProfileResponseModel()
            {
                Id = userId,
                Username = user.UserName,
                Email = user.Email,
                ImageUrl = user.Image.Url,
                BoughtCourses = user.BoughtCourses.Select(b => b.Id),
                LikedCourses = user.LikedCourses.Select(l => l.Id),
                OwnCourses = user.OwnCourses.Select(o => o.Id),
                BoughtLessons = user.BoughtLessons.Select(b => b.Id),
                LikedLessons = user.LikedLessons.Select(l => l.Id),
                OwnLessons = user.OwnLessons.Select(o => o.Id),
            };

            return profile;
        }

        public async Task<UserInformationResponseModel> GetUserInformationAsync(string userId)
        {
            return await this.applicationUserRepository
                .AllAsNoTracking()
                .Where(x => x.Id == userId)
                .To<UserInformationResponseModel>()
                .FirstOrDefaultAsync();
        }

        public async Task<bool> IsUserInRoleAsync(string userId, string role)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            if (await this.userManager.IsInRoleAsync(user, role))
            {
                return true;
            }

            return false;
        }

        public async Task<string> GetIdByUsernameAsync(string username)
        {
            var user = await this.applicationUserRepository
                .AllAsNoTracking()
                .Where(x => x.UserName == username)
                .FirstOrDefaultAsync();

            return user?.Id;
        }
    }
}
