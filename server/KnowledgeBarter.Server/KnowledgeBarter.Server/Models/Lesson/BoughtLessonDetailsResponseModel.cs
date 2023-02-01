namespace KnowledgeBarter.Server.Models.Lesson
{
    using KnowledgeBarter.Server.Services.Mapping;
    using KnowledgeBarter.Server.Data.Models;
    using AutoMapper;
    using KnowledgeBarter.Server.Models.Comments;
    using KnowledgeBarter.Server.Models.Lesson.Base;

    public class BoughtLessonDetailsResponseModel : BaseLessonDetailsResponseModel, IMapFrom<Lesson>, IHaveCustomMappings
    {
        public string Article { get; set; } = null!;

        public string Video { get; set; } = null!;

        public string Resources { get; set; } = null!;

        public string[] Tags { get; set; } = null!;

        public IEnumerable<CommentInListResponseModel> Comments { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Lesson, BoughtLessonDetailsResponseModel>()
                .ForMember(x => x.Thumbnail, opt =>
                    opt.MapFrom(i => i.Image.Url))
                .ForMember(x => x.Owner, opt =>
                    opt.MapFrom(i => i.OwnerId))
                .ForMember(x => x.Likes, opt =>
                    opt.MapFrom(i => i.Likes.Count()))
                .ForMember(x => x.Tags, opt =>
                    opt.MapFrom(i => i.Tags.Select(x => x.Text).ToArray()))
                .ForMember(x => x.Comments, opt =>
                    opt.MapFrom(i => i.Comments.Select(x => new CommentInListResponseModel()
                    {
                        Id = x.Id,
                        Text = x.Text,
                        LessonId = x.LessonId,
                        UserName = x.Owner.UserName,
                        ProfilePicture = x.Owner.Image.Url
                    })));
        }
    }
}
