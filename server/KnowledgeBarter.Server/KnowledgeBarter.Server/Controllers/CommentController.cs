using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        [Route(nameof(All))]
        public async Task<IEnumerable<CommentInListResponseModel>> All()
        {
            var all = await this.commentService.AllAsync();

            return all;
        }
    }
}
