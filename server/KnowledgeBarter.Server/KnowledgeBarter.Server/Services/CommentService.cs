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

        public CommentService(IRepository<Comment> commentRepository)
        {
            this.commentRepository = commentRepository;
        }

        public Task<IEnumerable<CommentInListResponseModel>> AllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<CreateCommentResponseModel> CreateAsync(CreateCommentResponseModel model, int lessonId, string userId)
        {
            // TODO: 
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
                .Where(x => x.Id == x.Id)
                .To<CreateCommentResponseModel>()
                .FirstAsync();
        }
    }
}
