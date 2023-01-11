using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Infrastructure.Extensions;
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

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult<CreateCommentResponseModel>> Create(CreateCommentResponseModel model, int lessonId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = this.User.Id();

            try
            {
                var response = await this.commentService.CreateAsync(model, lessonId, userId);

                return response;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
