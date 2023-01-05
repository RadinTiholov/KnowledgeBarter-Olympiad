using KnowledgeBarter.Server.Data.Models;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string username, string secret);

        Task<ApplicationUser> GetUserAsync(string userId);

        Task UpdatePoints(string userId, int points);
    }
}
