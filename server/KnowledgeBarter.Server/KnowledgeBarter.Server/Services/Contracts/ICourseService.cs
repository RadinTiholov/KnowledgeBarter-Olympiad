using KnowledgeBarter.Server.Models.Course;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseInListResponseModel>> AllAsync();

        Task<IEnumerable<CourseInListResponseModel>> HighestAsync();

        Task<CreateCourseResponseModel> CreateAsync(CreateCourseRequestModel model, string userId);

        Task<T> GetOneAsync<T>(int id);

        Task DeleteAsync(int courseId, string userId);

        Task<EditCourseResponseModel> EditAsync(EditCourseRequestModel model, int courseId, string userId);

        Task LikeAsync(int courseId, string userId);

        Task BuyAsync(int courseId, string userId);

        Task<bool> IsBoughtOrOwnerAsync(int courseId, string userId);
    }
}
