using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Identity;
using System.Security.Claims;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string username, string role, string secret);

        Task<ApplicationUser> GetUserAsync(string userId);

        Task UpdatePoints(string userId, int points);

        Task SubtractPointsAsync(string userId, int points);

        Task<IdentityProfileResponseModel> GetIdentityProfileAsync(string userId);

        Task<UserInformationResponseModel> GetUserInformationAsync(string userId);

        Task<bool> IsUserInRoleAsync(string userId, string role);

        Task<string> GetIdByUsernameAsync(string username);

        Task<IEnumerable<ProfilesInListResponseModel>> GetAllProfilesAsync();
    }
}
