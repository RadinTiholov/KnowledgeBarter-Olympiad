using KnowledgeBarter.Server.Data.Common.Repositories;
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
        private readonly IDeletableEntityRepository<Comment> commentRepository;
        private readonly ILessonService lessonService;

        public CommentService(IDeletableEntityRepository<Comment> commentRepository, ILessonService lessonService)
        {
            this.commentRepository = commentRepository;
            this.lessonService = lessonService;
        }

        public async Task<IEnumerable<CommentInListResponseModel>> AllForUserAsync(string userId)
        {
            return await this.commentRepository
                .AllAsNoTracking()
                .Where(x => x.OwnerId == userId)
                .To<CommentInListResponseModel>()
                .ToListAsync();
        }

        public async Task<IEnumerable<CommentWithPredictionInListResponseModel>> AllWithPredictionAsync()
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

        public async Task DeleteAsync(int id)
        {
            var comment = await this.commentRepository
                .All()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (comment == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            this.commentRepository.Delete(comment);
            await this.commentRepository.SaveChangesAsync();
        }
    }
}
