using AutoMapper;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Mapping;

namespace KnowledgeBarter.Server.Models.Comments
{
    public class CommentInListResponseModel : IMapFrom<Comment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public string Owner { get; set; } = null!;

        public int LessonId { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Comment, CommentInListResponseModel>()
                .ForMember(x => x.Owner, opt =>
                    opt.MapFrom(i => i.OwnerId));
        }
    }
}
