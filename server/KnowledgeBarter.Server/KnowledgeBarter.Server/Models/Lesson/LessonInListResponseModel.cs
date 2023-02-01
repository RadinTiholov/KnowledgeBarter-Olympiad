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


        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Lesson, LessonInListResponseModel>()
                .ForMember(x => x.Thumbnail, opt =>
                    opt.MapFrom(i => i.Image.Url));
        }
    }
}
