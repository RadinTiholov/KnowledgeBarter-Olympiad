namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string username, string secret);
    }
}
