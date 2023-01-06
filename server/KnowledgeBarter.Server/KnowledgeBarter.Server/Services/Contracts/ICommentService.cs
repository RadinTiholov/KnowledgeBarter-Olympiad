using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentInListResponseModel>> AllAsync();


    }
}
