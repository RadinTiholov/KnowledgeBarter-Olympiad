using KnowledgeBarter.Server.Infrastructure.Extensions;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using static KnowledgeBarter.Server.Infrastructure.WebConstants;

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
        [Route(IdRoute)]
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

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult<CreateLessonResponseModel>> Create(CreateLesssonRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = this.User.Id();
            try
            {
                var response = await this.lessonService.CreateAsync(model, userId);

                return response;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route(IdRoute)]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = this.User.Id();

            try
            {
                await this.lessonService.DeleteAsync(id, userId);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route(IdRoute)]
        public async Task<ActionResult<EditLessonResponseModel>> Edit(int id, EditLessonRequestModel model)
        {
            var userId = this.User.Id();

            try
            {
                var response = await this.lessonService.EditAsync(model, id, userId);

                return response;
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
