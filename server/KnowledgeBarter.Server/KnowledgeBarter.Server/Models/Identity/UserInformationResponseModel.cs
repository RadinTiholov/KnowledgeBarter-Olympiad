using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Mapping;

namespace KnowledgeBarter.Server.Models.Identity
{
    public class UserInformationResponseModel : IMapFrom<ApplicationUser>
    {
        public string UserName { get; set; } = null!;
    }
}
