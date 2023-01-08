using KnowledgeBarter.Server.Models.Course;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseInListResponseModel>> AllAsync();
    }
}
