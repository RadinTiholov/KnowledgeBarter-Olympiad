using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Mapping;

namespace KnowledgeBarter.Server.Models.Comments
{
    public class CommentInListResponseModel : IMapFrom<Comment>
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public string OwnerId { get; set; } = null!;

        public int LessonId { get; set; }
    }
}
