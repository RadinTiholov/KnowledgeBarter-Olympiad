namespace KnowledgeBarter.Server.Models.Course
{
    using KnowledgeBarter.Server.Data.Models;
    using KnowledgeBarter.Server.Services.Mapping;

    public class CreateCourseResponseModel : IMapFrom<Course>
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
    }
}
