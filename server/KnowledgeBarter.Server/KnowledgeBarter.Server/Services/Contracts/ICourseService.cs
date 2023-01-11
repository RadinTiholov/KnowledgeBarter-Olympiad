using KnowledgeBarter.Server.Models.Course;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseInListResponseModel>> AllAsync();

        Task<IEnumerable<CourseInListResponseModel>> HighestAsync();

        Task<CreateCourseResponseModel> CreateAsync(CreateCourseRequestModel model, string userId);

        Task<CourseDetailsResponseModel> GetOneAsync(int id);

        Task DeleteAsync(int courseId, string userId);
    }
}
