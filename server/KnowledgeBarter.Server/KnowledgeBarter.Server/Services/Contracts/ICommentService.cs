using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentInListResponseModel>> AllAsync();

        Task<Comment> CreateAsync(Comment model, string userId);
    }
}
