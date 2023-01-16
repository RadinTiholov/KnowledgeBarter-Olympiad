using AutoMapper;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Course;
using KnowledgeBarter.Server.Services.Mapping;

namespace KnowledgeBarter.Server.Models.Comments
{
    public class CreateCommentResponseModel : IMapFrom<Comment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string ProfilePicture { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Comment, CreateCommentResponseModel>()
                .ForMember(c => c.UserName, opt =>
                    opt.MapFrom(x => x.Owner.UserName))
                 .ForMember(c => c.ProfilePicture, opt =>
                    opt.MapFrom(x => x.Owner.Image.Url));
        }
    }
}
