namespace KnowledgeBarter.Server.Models.Lesson
{
    using KnowledgeBarter.Server.Services.Mapping;
    using KnowledgeBarter.Server.Data.Models;
    using AutoMapper;

    public class LessonInListResponseModel : IMapFrom<Lesson>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Thumbnail { get; set; } = null!;

        public string Owner { get; set; } = null!;

        public string OwnerName { get; set; } = null!;

        public int Likes { get; set; }

        public int Comments { get; set; }

        public int Views { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Lesson, LessonInListResponseModel>()
                .ForMember(x => x.Thumbnail, opt =>
                    opt.MapFrom(i => i.Image.Url))
                .ForMember(x => x.Owner, opt =>
                    opt.MapFrom(i => i.OwnerId))
                .ForMember(x => x.OwnerName, opt =>
                    opt.MapFrom(i => i.Owner.UserName))
                .ForMember(x => x.Likes, opt =>
                    opt.MapFrom(i => i.Likes.Count))
                .ForMember(x => x.Comments, opt =>
                    opt.MapFrom(i => i.Comments.Count));
        }
    }
}
