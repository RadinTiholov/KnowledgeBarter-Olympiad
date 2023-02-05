using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentWithPredictionInListResponseModel>> AllAsync();

        Task<CreateCommentResponseModel> CreateAsync(CreateCommentRequestModel model, int lessonId, string userId);
        Task DeleteAsync(int id);
    }
}
