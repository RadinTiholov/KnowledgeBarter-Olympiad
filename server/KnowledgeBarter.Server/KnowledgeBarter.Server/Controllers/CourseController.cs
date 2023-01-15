using KnowledgeBarter.Server.Infrastructure.Extensions;
using KnowledgeBarter.Server.Models.Course;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using static KnowledgeBarter.Server.Infrastructure.WebConstants;

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
        public async Task<ActionResult<CreateCourseResponseModel>> Create([FromForm] CreateCourseRequestModel model)
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

        /// <summary>
        /// Retrieves a single course by Id.
        /// </summary>
        /// <param name="id">The Id of the course to retrieve</param>
        /// <returns>The course details or an error message</returns>
        [HttpGet]
        [Route(IdRoute)]
        public async Task<ActionResult<CourseDetailsResponseModel>> Details(int id)
        {
            try
            {
                var course = await this.courseService.GetOneAsync(id);

                return course;
            }
            catch (ArgumentException ae)
            {
                return BadRequest(ae.Message);
            }
        }

        /// <summary>
        /// Attempts to delete a single course by Id and userId and returns a 'OK' HTTP status code if successful. 
        /// Returns a 'Bad Request' HTTP status code and an error message if the course is not found.
        /// </summary>
        /// <param name="id">The Id of the course to delete</param>
        /// <returns>HTTP status code indicating success or failure</returns>
        [HttpDelete]
        [Route(IdRoute)]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = this.User.Id();

            try
            {
                await this.courseService.DeleteAsync(id, userId);

                return Ok();
            }
            catch (ArgumentException ae)
            {
                return BadRequest(ae.Message);
            }
        }

        /// <summary>
        /// Edits a course with the given id and input data.
        /// </summary>
        /// <param name="id">The id of the course to edit.</param>
        /// <param name="model">An object containing the input data for the course edit.</param>
        /// <returns>The the edited course, or a bad request error if the request is invalid.</returns>
        [HttpPut]
        [Route(IdRoute)]
        public async Task<ActionResult<EditCourseResponseModel>> Edit(int id, [FromForm] EditCourseRequestModel model)
        {
            var userId = this.User.Id();

            try
            {
                var response = await this.courseService.EditAsync(model, id, userId);

                return response;
            }
            catch (ArgumentException ae)
            {
                return BadRequest(ae.Message);
            }
        }

        /// <summary>
        /// Likes a course with the given id.
        /// </summary>
        /// <param name="id">The id of the course to like.</param>
        /// <returns>An HTTP status code indicating the result of the like request.</returns>
        [HttpGet]
        [Route(LikeCourseRoute)]
        public async Task<ActionResult> Like(int id)
        {
            var userId = this.User.Id();

            try
            {
                await this.courseService.LikeAsync(id, userId);

                return Ok();
            }
            catch (ArgumentException ae)
            {
                return BadRequest(ae.Message);
            }
        }

        /// <summary>
        /// Buys a course with the given id.
        /// </summary>
        /// <param name="id">The id of the course to buy.</param>
        /// <returns>An HTTP status code indicating the result of the buy request.</returns>
        [HttpGet]
        [Route(BuyCourseRoute)]
        public async Task<ActionResult> Buy(int id)
        {
            var userId = this.User.Id();

            try
            {
                await this.courseService.BuyAsync(id, userId);

                return Ok();
            }
            catch (ArgumentException ae)
            {
                return BadRequest(ae.Message);
            }
        }
    }
}
