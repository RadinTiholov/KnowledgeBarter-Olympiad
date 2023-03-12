using AutoMapper;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Mapping;

namespace KnowledgeBarter.Server.Models.Identity
{
    public class ProfilesInListResponseModel : IMapFrom<ApplicationUser>, IHaveCustomMappings
    {
        public string Id { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string ImageUrl { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<ApplicationUser, IdentityProfileResponseModel>()
                .ForMember(x => x.ImageUrl, opt =>
                    opt.MapFrom(a => a.Image.Url));
        }
    }
}
