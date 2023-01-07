using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Contracts;

namespace KnowledgeBarter.Server.Services
{
    public class LikeService : ILikeService
    {
        private readonly IRepository<Like> likeRepository;

        public LikeService(IRepository<Like> likeRepository)
        {
            this.likeRepository = likeRepository;
        }

        public async Task<Like> LikeLessonAsync(int lessonId, string userId)
        {
            var like = new Like()
            {
                LessonId = lessonId,
                OwnerId = userId,
            };

            await this.likeRepository.AddAsync(like);
            await this.likeRepository.SaveChangesAsync();

            return like;
        }
    }
}
