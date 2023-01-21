using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Identity;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace KnowledgeBarter.Server.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly IRepository<ApplicationUser> applicationUserRepository;

        public IdentityService(IRepository<ApplicationUser> applicationUserRepository)
        {
            this.applicationUserRepository = applicationUserRepository;
        }

        public string GenerateJwtToken(string userId, string username, string secret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, userId),
                    new Claim(ClaimTypes.NameIdentifier, username),
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
                OwnCourses = user.OwnCourses.Select(o => o.Id),
                BoughtLessons = user.BoughtLessons.Select(b => b.Id),
                LikedLessons = user.LikedLessons.Select(l => l.Id),
                OwnLessons = user.OwnLessons.Select(o => o.Id),
            };

            return profile;
        }
    }
}
