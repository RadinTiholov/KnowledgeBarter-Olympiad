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
    }
}
