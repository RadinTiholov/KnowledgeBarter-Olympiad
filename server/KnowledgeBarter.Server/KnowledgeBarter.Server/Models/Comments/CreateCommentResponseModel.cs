using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Mapping;

namespace KnowledgeBarter.Server.Models.Comments
{
    public class CreateCommentResponseModel : IMapFrom<Comment>
    {
        public string Text { get; set; }
    }
}
