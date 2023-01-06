using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;

namespace KnowledgeBarter.Server.Controllers
{
    [Authorize]
    public class CommentController : ApiController
    {
        private readonly ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }
    }
}
