using KnowledgeBarter.Server.Infrastructure.Extensions;
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

        /// <summary>
        /// Gets a list of the highest rated courses.
        /// </summary>
        /// <returns>A list of all available courses.</returns>
        [HttpGet]
        [Route(nameof(Highest))]
        public async Task<IEnumerable<CourseInListResponseModel>> Highest()
        {
            var all = await this.courseService.HighestAsync();

            return all;
        }

        /// <summary>
        /// Creates a new course with the given input data.
        /// </summary>
        /// <param name="model">An object containing the input data for the new course, including the title, description, and image url.</param>
        /// <returns>The id of the newly created course, or a bad request error if the request is invalid.</returns>
        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult<CreateCourseResponseModel>> Create(CreateCourseRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = this.User.Id();

            try
            {
                var response = await this.courseService.CreateAsync(model, userId);

                return response;
            }
            catch (ArgumentException ae)
            {
                return BadRequest(ae.Message);
            }
        }
    }
}
