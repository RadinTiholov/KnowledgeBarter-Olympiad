﻿using KnowledgeBarter.Server.Infrastructure.Extensions;
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

        /// <summary>
        /// Gets a list of all available lessons.
        /// </summary>
        /// <returns>A list of all available lessons.</returns>
        [HttpGet]
        [Route(nameof(All))]
        public async Task<IEnumerable<LessonInListResponseModel>> All()
        {
            var all = await this.lessonService.AllAsync();

            return all;
        }

        /// <summary>
        /// Gets a list of the most popular lessons.
        /// </summary>
        /// <returns>A list of the most popular lessons.</returns>
        [HttpGet]
        [Route(nameof(Popular))]
        public async Task<IEnumerable<LessonInListResponseModel>> Popular()
        {
            var popular = await this.lessonService.PopularAsync();

            return popular;
        }

        /// <summary>
        /// Gets the details of a lesson with the given id.
        /// </summary>
        /// <param name="id">The id of the lesson to retrieve.</param>
        /// <returns>The details of the lesson, or a bad request error if the lesson does not exist.</returns>
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

        /// <summary>
        /// Creates a new lesson with the given input data.
        /// </summary>
        /// <param name="model">An object containing the input data for the new lesson, including the title, description, and image url.</param>
        /// <returns>The id of the newly created lesson, or a bad request error if the request is invalid.</returns>
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

        /// <summary>
        /// Deletes a lesson with the given id.
        /// </summary>
        /// <param name="id">The id of the lesson to delete.</param>
        /// <returns>An HTTP status code indicating the result of the delete request.</returns>
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

        /// <summary>
        /// Edits a lesson with the given id and input data.
        /// </summary>
        /// <param name="id">The id of the lesson to edit.</param>
        /// <param name="model">An object containing the input data for the lesson edit, including the title, description, and image url.</param>
        /// <returns>The id of the edited lesson, or a bad request error if the request is invalid.</returns>
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
