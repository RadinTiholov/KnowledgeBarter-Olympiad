using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBarter.Server.Services
{
    public class LessonService : ILessonService
    {
        private readonly IDeletableEntityRepository<Lesson> lessonRepository;

        public LessonService(IDeletableEntityRepository<Lesson> lessonRepository)
        {
            this.lessonRepository = lessonRepository;
        }
        public async Task<IEnumerable<LessonInListResponseModel>> AllAsync()
        {
            return await this.lessonRepository
                .AllAsNoTracking()
                .Select(x => new LessonInListResponseModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Article = x.Article,
                })
                .ToListAsync();
        }
    }
}
