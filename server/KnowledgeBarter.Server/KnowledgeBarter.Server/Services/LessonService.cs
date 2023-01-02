using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
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

        public async Task<LessonDetailsResponseModel> GetOneAsync(int id)
        {
            var lesson = await this.lessonRepository
                .AllAsNoTracking()
                .Where(x => x.Id == id)
                .To<LessonDetailsResponseModel>()
                .FirstOrDefaultAsync();

            if (lesson == null)
            {
                throw new ArgumentException();
            }

            return lesson;
        }

        public async Task<IEnumerable<LessonInListResponseModel>> PopularAsync()
        {
            return await this.lessonRepository
                .AllAsNoTracking()
                .OrderByDescending(x => x.Views)
                .Take(4)
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
