namespace KnowledgeBarter.Server.Models.Course
{
    using AutoMapper;
    using KnowledgeBarter.Server.Data.Models;
    using KnowledgeBarter.Server.Services.Mapping;

    public class CourseInListResponseModel : IMapFrom<Course>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Thumbnail { get; set; } = null!;

        public int Likes { get; set; }

        public int Price { get; set; }

        public string Owner { get; set; } = null!;

        public int[] Lessons { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Course, CourseInListResponseModel>()
                .ForMember(x => x.Thumbnail, opt =>
                    opt.MapFrom(i => i.Image.Url))
                .ForMember(x => x.Owner, opt =>
                    opt.MapFrom(i => i.OwnerId))
                .ForMember(x => x.Likes, opt =>
                    opt.MapFrom(i => i.Likes.Count()))
                .ForMember(x => x.Lessons, opt =>
                    opt.MapFrom(i => i.Lessons.Select(x => x.Id).ToArray()));
        }
    }
}
