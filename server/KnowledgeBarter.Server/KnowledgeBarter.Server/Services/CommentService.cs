using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBarter.Server.Services
{
    public class CommentService : ICommentService
    {
        private readonly IRepository<Comment> commentRepository;
        private readonly IRepository<Lesson> lessonRepository;

        public CommentService(IRepository<Comment> commentRepository, IRepository<Lesson> lessonRepository)
        {
            this.commentRepository = commentRepository;
            this.lessonRepository = lessonRepository;
        }

        public Task<IEnumerable<CommentInListResponseModel>> AllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<CreateCommentResponseModel> CreateAsync(CreateCommentResponseModel model, int lessonId, string userId)
        {
            var lesson = await lessonRepository
                .All()
                .Where(x => x.Id == x.Id)
                .FirstOrDefaultAsync();

            if (lesson == null)
            {
                // TODO: extract error message in a constant
                throw new ArgumentNullException("Cannot create comment for a lesson that does not exist");
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
