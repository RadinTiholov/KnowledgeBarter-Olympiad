using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBarter.Server.Controllers
{
    [Authorize]
    public class LessonController : ApiController
    {
        private readonly ILessonService lessonService;

        public LessonController(ILessonService lessonService)
        {
            this.lessonService = lessonService;
        }

        [HttpGet]
        [Route(nameof(All))]
        public async Task<IEnumerable<LessonInListResponseModel>> All()
        {
            var all = await this.lessonService.AllAsync();

            return all;
        }

        [HttpGet]
        [Route(nameof(Popular))]
        public async Task<IEnumerable<LessonInListResponseModel>> Popular()
        {
            var popular = await this.lessonService.PopularAsync();

            return popular;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<LessonDetailsResponseModel>> Details(int id)
        {
            try
            {
                var lesson = await this.lessonService.GetOneAsync(id);

                return lesson;
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
        }
    }
}
