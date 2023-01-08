using KnowledgeBarter.Server.Models.Course;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBarter.Server.Controllers
{
    [Authorize]
    public class CourseController : ApiController
    {
        private readonly ICourseService courseService;

        public CourseController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        /// <summary>
        /// Gets a list of all available courses.
        /// </summary>
        /// <returns>A list of all available courses.</returns>
        [HttpGet]
        [Route(nameof(All))]
        public async Task<IEnumerable<CourseInListResponseModel>> All()
        {
            var all = await this.courseService.AllAsync();

            return all;
        }
    }
}
