using KnowledgeBarter.Server.Data.Models;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ILikeService
    {
        Task<Like> LikeLessonAsync(int lessonId, string userId);

        Task<Like> LikeCourseAsync(int courseId, string userId);
    }
}
