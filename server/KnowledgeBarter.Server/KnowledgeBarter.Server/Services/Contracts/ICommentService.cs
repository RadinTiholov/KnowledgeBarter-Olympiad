using KnowledgeBarter.Server.Models.Comments;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentInListResponseModel>> AllAsync();

    }
}
