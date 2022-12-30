using KnowledgeBarter.Server.Models.Lesson;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ILessonService
    {
        Task<IEnumerable<LessonInListResponseModel>> AllAsync();

        Task<IEnumerable<LessonInListResponseModel>> PopularAsync();

        Task<LessonDetailsResponseModel> GetOneAsync(int id);
    }
}
