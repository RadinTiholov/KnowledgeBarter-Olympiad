using System.Security.Claims;

namespace KnowledgeBarter.Server.Infrastructure.Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static string Id(this ClaimsPrincipal user)
        {
            return user.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Name)
                .Value;
        }
    }
}
