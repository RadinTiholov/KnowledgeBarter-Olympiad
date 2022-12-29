using KnowledgeBarter.Server.Models.Lesson;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ILessonService
    {
        Task<IEnumerable<LessonInListResponseModel>> AllAsync();
    }
}
