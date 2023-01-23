namespace KnowledgeBarter.Server.Models.Lesson
{
    using KnowledgeBarter.Server.Models.Comments;
    using KnowledgeBarter.Server.Services.Mapping;
    using AutoMapper;
    using KnowledgeBarter.Server.Data.Models;

    public class CreateLessonResponseModel : IMapFrom<Lesson>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Article { get; set; } = null!;

        public string Thumbnail { get; set; } = null!;

        public string Video { get; set; } = null!;

        public string Resources { get; set; } = null!;

        public int Likes { get; set; }

        public int Price { get; set; }

        public int Views { get; set; }

        public string Owner { get; set; } = null!;

        public string[] Tags { get; set; } = null!;

        public IEnumerable<CommentInListResponseModel> Comments { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Lesson, CreateLessonResponseModel>()
                .ForMember(x => x.Thumbnail, opt =>
                    opt.MapFrom(i => i.Image.Url))
                .ForMember(x => x.Owner, opt =>
                    opt.MapFrom(i => i.OwnerId))
                .ForMember(x => x.Likes, opt =>
                    opt.MapFrom(i => i.Likes.Count()))
                .ForMember(x => x.Tags, opt =>
                    opt.MapFrom(i => i.Tags.Select(x => x.Text).ToArray()))
                .ForMember(x => x.Comments, opt =>
                    opt.MapFrom(i => i.Comments.Select(x => new CommentInListResponseModel() { Id = x.Id, Text = x.Text, LessonId = x.LessonId, Owner = x.OwnerId })));
        }
    }
}
