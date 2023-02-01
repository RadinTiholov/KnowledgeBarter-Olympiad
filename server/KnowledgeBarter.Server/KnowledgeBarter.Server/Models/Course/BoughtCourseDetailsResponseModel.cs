namespace KnowledgeBarter.Server.Models.Course
{
    using KnowledgeBarter.Server.Services.Mapping;
    using KnowledgeBarter.Server.Data.Models;
    using AutoMapper;
    using KnowledgeBarter.Server.Models.Lesson;
    using KnowledgeBarter.Server.Models.Course.Base;

    public class BoughtCourseDetailsResponseModel : BaseCourseDetailsResponseModel, IMapFrom<Course>, IHaveCustomMappings
    {
        public List<LessonInListResponseModel> Lessons { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Course, BoughtCourseDetailsResponseModel>()
                .ForMember(x => x.Thumbnail, opt =>
                    opt.MapFrom(i => i.Image.Url))
                .ForMember(x => x.Owner, opt =>
                    opt.MapFrom(i => i.OwnerId))
                .ForMember(x => x.Likes, opt =>
                    opt.MapFrom(i => i.Likes.Count()));
        }
    }
}
