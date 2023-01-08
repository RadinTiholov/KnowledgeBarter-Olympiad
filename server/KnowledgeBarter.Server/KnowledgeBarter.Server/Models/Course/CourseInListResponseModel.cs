namespace KnowledgeBarter.Server.Models.Course
{
    using KnowledgeBarter.Server.Data.Models;
    using KnowledgeBarter.Server.Services.Mapping;

    public class CourseInListResponseModel : IMapFrom<Course>
    {
        public int Id { get; set; }

        public int Title { get; set; }
    }
}
