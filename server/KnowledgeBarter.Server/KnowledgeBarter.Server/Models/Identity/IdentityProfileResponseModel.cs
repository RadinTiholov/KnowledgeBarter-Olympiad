using AutoMapper;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Mapping;

namespace KnowledgeBarter.Server.Models.Identity
{
    public class IdentityProfileResponseModel : IMapFrom<ApplicationUser>, IHaveCustomMappings
    {
        public string Id { get; set; }

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string ImageUrl { get; set; } = null!;

        public IEnumerable<int> BoughtCourses { get; set; } = null!;

        public IEnumerable<int> LikedCourses { get; set; } = null!;

        public IEnumerable<int> OwnCourses { get; set; } = null!;

        public IEnumerable<int> LikedLessons { get; set; } = null!;

        public IEnumerable<int> BoughtLessons { get; set; } = null!;

        public IEnumerable<int> OwnLessons { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<ApplicationUser, IdentityProfileResponseModel>()
                .ForMember(x => x.ImageUrl, opt =>
                    opt.MapFrom(a => a.Image.Url));
        }
    }
}
