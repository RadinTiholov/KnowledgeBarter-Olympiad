using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Mapping;

namespace KnowledgeBarter.Server.Models.Identity
{
    public class IdentityProfileResponseModel
    {
        public string Username { get; set; } = null!;

        public string ProfilePicture { get; set; } = null!;

        public string Email { get; set; } = null!;

        public Image Image { get; set; } = null!;
    }
}
