using KnowledgeBarter.Server.Models.Comments;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentWithPredictionInListResponseModel>> AllWithPredictionAsync();

        Task<IEnumerable<CommentInListResponseModel>> AllForUserAsync(string userId);

        Task<CreateCommentResponseModel> CreateAsync(CreateCommentRequestModel model, int lessonId, string userId);
        Task DeleteAsync(int id);
    }
}
