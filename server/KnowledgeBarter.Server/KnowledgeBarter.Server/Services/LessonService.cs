using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;
using static KnowledgeBarter.Server.Services.ServiceConstants;

namespace KnowledgeBarter.Server.Services
{
    public class LessonService : ILessonService
    {
        private readonly IDeletableEntityRepository<Lesson> lessonRepository;
        private readonly IRepository<ApplicationUser> applicationUserRepository;
        private readonly IImageService imageService;
        private readonly ITagService tagService;
        private readonly IIdentityService identityService;
        private readonly ILikeService likeService;

        public LessonService(IDeletableEntityRepository<Lesson> lessonRepository, IRepository<ApplicationUser> applicationUserRepository, IImageService imageService, ITagService tagService, IIdentityService identityService, ILikeService likeService)
        {
            this.lessonRepository = lessonRepository;
            this.applicationUserRepository = applicationUserRepository;
            this.imageService = imageService;
            this.tagService = tagService;
            this.identityService = identityService;
            this.likeService = likeService;
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

        public async Task<CreateLessonResponseModel> CreateAsync(CreateLesssonRequestModel model, string userId)
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
                OwnerId = userId,
            };

            await this.lessonRepository.AddAsync(lesson);
            await this.lessonRepository.SaveChangesAsync();

            var tags = await this.tagService.CreateManyAsync(model.Tags, lesson.Id);
            lesson.Tags = (ICollection<Tag>)tags;

            this.lessonRepository.Update(lesson);
            await this.lessonRepository.SaveChangesAsync();

            //Add 100 KB points to the user as a reward
            await this.identityService.UpdatePoints(userId, 100);

            return await this.lessonRepository
                .All()
                .Where(x => x.Id == lesson.Id)
                .To<CreateLessonResponseModel>()
                .FirstAsync();
        }
        public async Task<EditLessonResponseModel> EditAsync(EditLessonRequestModel model, int lessonId, string userId)
        {
            var lesson = await this.GetLessonAsync(lessonId);
            var user = await this.identityService.GetUserAsync(userId);

            if (lesson == null || user == null || lesson.OwnerId != userId)
            {
                throw new ArgumentException();
            }

            var image = await this.imageService.CreateAsync(model.Image);
            var tags = await this.tagService.CreateManyAsync(model.Tags, lessonId);

            lesson.Title = model.Title;
            lesson.Description = model.Description;
            lesson.Article = model.Article;
            lesson.Image = image;
            lesson.Video = model.Video;
            lesson.Resources = model.Resources;
            lesson.Tags = (ICollection<Tag>)tags;

            this.lessonRepository.Update(lesson);
            await this.lessonRepository.SaveChangesAsync();

            return await this.lessonRepository
                .All()
                .Where(x => x.Id == lesson.Id)
                .To<EditLessonResponseModel>()
                .FirstAsync();
        }

        public async Task DeleteAsync(int id, string userId)
        {
            var user = await this.identityService.GetUserAsync(userId);
            var lesson = await this.GetLessonAsync(id);

            if (user == null || lesson == null || lesson.OwnerId != userId)
            {
                throw new ArgumentException();
            }

            this.lessonRepository.Delete(lesson);
            await this.lessonRepository.SaveChangesAsync();

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

            //Increase views
            var lessonForUpdate = await this.GetLessonAsync(lesson.Id);
            lessonForUpdate.Views++;

            this.lessonRepository.Update(lessonForUpdate);
            await this.lessonRepository.SaveChangesAsync();

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

        private async Task<Lesson> GetLessonAsync(int lessonId)
        {
            return await this.lessonRepository
                .AllAsNoTracking()
                .Where(x => x.Id == lessonId)
                .FirstAsync();
        }

        public async Task LikeAsync(int lessonId, string userId)
        {
            var user = await this.identityService.GetUserAsync(userId);
            var lesson = await this.GetLessonAsync(lessonId);

            if (user == null || lesson == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            if (lesson.OwnerId != userId && !user.LikedLessons.Any(x => x.Id == lessonId))
            {
                var like = await this.likeService.LikeLessonAsync(lessonId, userId);

                user.LikedLessons.Add(lesson);
                this.applicationUserRepository.Update(user);
                await this.applicationUserRepository.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException(Unauthorized);
            }
        }
    }
}
