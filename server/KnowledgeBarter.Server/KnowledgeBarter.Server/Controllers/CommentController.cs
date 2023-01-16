using KnowledgeBarter.Server.Infrastructure.Extensions;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static KnowledgeBarter.Server.Infrastructure.WebConstants;


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

        /// <summary>
        /// Get all comment of a certain lesson
        /// </summary>
        /// <param name="lessonId"></param>
        /// <returns>Bad request error if the request is invalid, all comments of a certain lesson or the corresponding exception</returns>
        [HttpGet]
        [Route(nameof(All))]
        public async Task<IEnumerable<CommentInListResponseModel>> All(int lessonId)
        {
            var all = await this.commentService.AllByLessonIdAsync(lessonId);

            return all;
        }

        /// <summary>
        /// Create a comment using inject data model and lesson id
        /// </summary>
        /// <param name="model"></param>
        /// <param name="lessonId"></param>
        /// <returns>Bad request error if the request is invalid, the the newly created comment or the corresponding exception</returns>
        [HttpPost]
        [Route(nameof(CreateCommentRoute))]
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
