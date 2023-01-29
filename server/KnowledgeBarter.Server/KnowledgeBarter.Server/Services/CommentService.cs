﻿using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;
using ML;
using static KnowledgeBarter.Server.Services.ServiceConstants;


namespace KnowledgeBarter.Server.Services
{
    public class CommentService : ICommentService
    {
        private readonly IRepository<Comment> commentRepository;
        private readonly ILessonService lessonService;

        public CommentService(IRepository<Comment> commentRepository, ILessonService lessonService)
        {
            this.commentRepository = commentRepository;
            this.lessonService = lessonService;
        }

        public async Task<IEnumerable<CommentWithPredictionInListResponseModel>> AllAsync()
        {
            var comments = await this.commentRepository
                .AllAsNoTracking()
                .To<CommentWithPredictionInListResponseModel>()
                .ToListAsync();

            foreach (var comment in comments)
            {
                ModelInput sampleData = new ModelInput()
                {
                    Review = comment.Text,
                };

                var predictionResult = ReviewPredictionModel.Predict(sampleData);

                comment.Prediction = predictionResult.Prediction.ToUpper();
            }

            return comments;
        }

        public async Task<CreateCommentResponseModel> CreateAsync(CreateCommentRequestModel model, int lessonId, string userId)
        {
            if (!await lessonService.ExistsAsync(lessonId))
            {
                throw new ArgumentNullException(LessonForCommentShouldExist);
            }

            var comment = new Comment()
            {
                LessonId = lessonId,
                OwnerId = userId,
                Text = model.Text,
            };

            await this.commentRepository.AddAsync(comment);
            await this.commentRepository.SaveChangesAsync();

            return await this.commentRepository
                .All()
                .Where(c => c.Id == comment.Id)
                .To<CreateCommentResponseModel>()
                .FirstAsync();
        }
    }
}
