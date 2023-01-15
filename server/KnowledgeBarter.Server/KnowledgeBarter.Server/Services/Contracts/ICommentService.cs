using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentInListResponseModel>> AllByLessonIdAsync(int lessonId);

        Task<CreateCommentResponseModel> CreateAsync(CreateCommentResponseModel model, int lessonId, string userId);
    }
}
