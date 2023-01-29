namespace KnowledgeBarter.Server.Models.Comments
{
    using AutoMapper;
    using KnowledgeBarter.Server.Services.Mapping;
    using KnowledgeBarter.Server.Data.Models;

    public class CommentWithPredictionInListResponseModel : IMapFrom<Comment>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string ProfilePicture { get; set; } = null!;

        public int LessonId { get; set; }

        public string Prediction { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Comment, CommentWithPredictionInListResponseModel>()
                .ForMember(c => c.UserName, opt =>
                    opt.MapFrom(x => x.Owner.UserName))
                 .ForMember(c => c.ProfilePicture, opt =>
                    opt.MapFrom(x => x.Owner.Image.Url));
        }
    }
}
