using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;
using static KnowledgeBarter.Server.Services.ServiceConstants;


namespace KnowledgeBarter.Server.Services
{
    public class CommentService : ICommentService
    {
        private readonly IRepository<Comment> commentRepository;
        private readonly IRepository<Lesson> lessonRepository;

        private readonly ILessonService lessonService;

        public CommentService(IRepository<Comment> commentRepository, IRepository<Lesson> lessonRepository)
        {
            this.commentRepository = commentRepository;
            this.lessonRepository = lessonRepository;
        }

        public async Task<IEnumerable<CommentInListResponseModel>> AllByLessonIdAsync(int lessonId)
        {
            if (await lessonService.ExistsAsync(lessonId))
            {
                throw new ArgumentNullException(LessonForCommentShouldExist);
            }

            return await this.commentRepository
                .All()
                .Where(c => c.LessonId == lessonId)
                .To<CommentInListResponseModel>()
                .ToListAsync();
        }

        public async Task<CreateCommentResponseModel> CreateAsync(CreateCommentResponseModel model, int lessonId, string userId)
        {
            if (await lessonService.ExistsAsync(lessonId))
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
