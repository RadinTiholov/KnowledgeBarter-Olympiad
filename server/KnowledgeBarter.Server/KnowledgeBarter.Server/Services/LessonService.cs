using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBarter.Server.Services
{
    public class LessonService : ILessonService
    {
        private readonly IDeletableEntityRepository<Lesson> lessonRepository;
        private readonly IImageService imageService;
        private readonly ITagService tagService;
        private readonly IIdentityService identityService;

        public LessonService(IDeletableEntityRepository<Lesson> lessonRepository, IImageService imageService, ITagService tagService, IIdentityService identityService)
        {
            this.lessonRepository = lessonRepository;
            this.imageService = imageService;
            this.tagService = tagService;
            this.identityService = identityService;
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

        public async Task<CreateLessonResponseModel> CreateAsync(CreateLesssonRequestModel model, string ownerId)
        {
            var image = await this.imageService.CreateAsync(model.Image);

            var lesson = new Lesson()
            {
                Title = model.Title,
                Description = model.Description,
                Article = model.Article,
                Video = model.Video,
                ImageId = image.Id,
                Resources = model.Resources,
                Views = 0,
                Price = 0,
                OwnerId = ownerId,
            };

            await this.lessonRepository.AddAsync(lesson);
            await this.lessonRepository.SaveChangesAsync();

            var tags = await this.tagService.CreateManyAsync(model.Tags, lesson.Id);
            lesson.Tags = (ICollection<Tag>)tags;

            this.lessonRepository.Update(lesson);
            await this.lessonRepository.SaveChangesAsync();

            //Add 100 KB points to the user as a reward
            await this.identityService.UpdatePoints(ownerId, 100);

            return await this.lessonRepository
                .All()
                .Where(x => x.Id == lesson.Id)
                .To<CreateLessonResponseModel>()
                .FirstAsync();
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
