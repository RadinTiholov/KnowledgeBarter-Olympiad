namespace KnowledgeBarter.Server.Models.Course
{
    using AutoMapper;
    using KnowledgeBarter.Server.Models.Lesson;
    using KnowledgeBarter.Server.Services.Mapping;
    using KnowledgeBarter.Server.Data.Models;

    public class EditCourseResponseModel : IMapFrom<Course>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Thumbnail { get; set; } = null!;

        public int Likes { get; set; }

        public int Price { get; set; }

        public string Owner { get; set; } = null!;

        public List<LessonInListResponseModel> Lessons { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Course, EditCourseResponseModel>()
                .ForMember(x => x.Thumbnail, opt =>
                    opt.MapFrom(i => i.Image.Url))
                .ForMember(x => x.Owner, opt =>
                    opt.MapFrom(i => i.OwnerId))
                .ForMember(x => x.Likes, opt =>
                    opt.MapFrom(i => i.Likes.Count()));
        }
    }
}
