using KnowledgeBarter.Server.Models.Lesson;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ILessonService
    {
        Task<IEnumerable<LessonInListResponseModel>> AllAsync();

        Task<IEnumerable<LessonInListResponseModel>> PopularAsync();

        Task<IEnumerable<LessonInListResponseModel>> RecommendedAsync(string userId);

        Task<T> GetOneAsync<T>(int id);

        Task<CreateLessonResponseModel> CreateAsync(CreateLesssonRequestModel model, string userId);

        Task<EditLessonResponseModel> EditAsync(EditLessonRequestModel model, int lessonId, string userId);

        Task DeleteAsync(int lessonId, string userId);

        Task LikeAsync(int lessonId, string userId);

        Task BuyAsync(int lessonId, string userId);

        Task<bool> ExistsAsync(int lessonId);

        Task<bool> IsBoughtOrOwnerAsync(int lessonId, string userId);
    }
}
