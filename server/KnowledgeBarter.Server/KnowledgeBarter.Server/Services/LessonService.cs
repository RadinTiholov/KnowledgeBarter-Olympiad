﻿using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Infrastructure;
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
                .To<LessonInListResponseModel>()
                .ToListAsync();
        }

        public async Task<CreateLessonResponseModel> CreateAsync(CreateLessonRequestModel model, string userId)
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
                Price = 100,
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

            if (user == null || lesson == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            if (lesson.OwnerId != userId && !await this.identityService.IsUserInRoleAsync(userId, WebConstants.AdministratorRoleName))
            {
                throw new ArgumentException(Unauthorized);
            }

            Image image;
            if (model.Image != null)
            {
                image = await this.imageService.CreateAsync(model.Image);
            }
            else
            {
                image = lesson.Image;
            }
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

            if (user == null || lesson == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            if (lesson.OwnerId != userId && !await this.identityService.IsUserInRoleAsync(userId, WebConstants.AdministratorRoleName))
            {
                throw new ArgumentException(Unauthorized);
            }

            this.lessonRepository.Delete(lesson);
            await this.lessonRepository.SaveChangesAsync();
        }

        public async Task<T> GetOneAsync<T>(int id)
        {
            var lesson = await this.lessonRepository
                .AllAsNoTracking()
                .Where(x => x.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();

            if (lesson == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            //Increase views

            var lessonForUpdate = await this.GetLessonAsync(id);
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
                .Take(8)
                .To<LessonInListResponseModel>()
                .ToListAsync();
        }

        private async Task<Lesson> GetLessonAsync(int lessonId)
        {
            return await this.lessonRepository
                .All()
                .Where(x => x.Id == lessonId)
                .Include(x => x.Image)
                .FirstOrDefaultAsync();
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

        public async Task BuyAsync(int lessonId, string userId)
        {
            var user = await this.identityService.GetUserAsync(userId);
            var lesson = await this.GetLessonAsync(lessonId);

            if (user == null || lesson == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            if (lesson.OwnerId == userId || user.BoughtLessons.Any(x => x.Id == lessonId))
            {
                throw new ArgumentException(Unauthorized);
            }

            if (user.KBPoints < lesson.Price)
            {
                throw new ArgumentException(NotEnoughMoney);
            }

            await this.identityService.SubtractPointsAsync(userId, lesson.Price);

            user.BoughtLessons.Add(lesson);
            this.applicationUserRepository.Update(user);
            await this.applicationUserRepository.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(int lessonId)
        {
            var lesson = await lessonRepository
                .AllAsNoTracking()
                .Where(x => x.Id == lessonId)
                .FirstOrDefaultAsync();

            return lesson != null;
        }

        public async Task<IEnumerable<LessonInListResponseModel>> RecommendedAsync(string userId)
        {
            var lessons = await this.lessonRepository
                .All()
                .Where(x => x.UsersWhoBought.Any(x => x.Id == userId))
                .Include(x => x.UsersWhoBought)
                .Include(x => x.Tags)
                .ToListAsync();

            Dictionary<string, int> tagsDictionary = new Dictionary<string, int>();
            foreach (var lesson in lessons)
            {
                foreach (var tag in lesson.Tags)
                {
                    if (tagsDictionary.ContainsKey(tag.Text))
                    {
                        tagsDictionary[tag.Text]++;
                    }
                    else
                    {
                        tagsDictionary.Add(tag.Text, 1);
                    }
                }
            }
            var theMostPopular = await this.PopularAsync();
            if (tagsDictionary.Count() == 0)
            {
                return theMostPopular;
            }
            else
            {
                var theMostCommonTag = tagsDictionary.OrderByDescending(x => x.Value).Take(1).First();

                var recommended = await this.lessonRepository
                    .All()
                    .Where(x => !x.UsersWhoBought.Any(x => x.Id == userId))
                    .Where(x => x.Tags.Any(t => t.Text == theMostCommonTag.Key))
                    .Include(x => x.UsersWhoBought)
                    .Include(x => x.Tags)
                    .Take(5)
                    .To<LessonInListResponseModel>()
                    .ToListAsync();

                recommended.AddRange(theMostPopular.Take(5 - recommended.Count));

                return recommended;
            }
        }

        public async Task<bool> IsBoughtOrOwnerAsync(int lessonId, string userId)
        {
            var user = await this.identityService.GetUserAsync(userId);
            var lesson = await this.GetLessonAsync(lessonId);

            if (user == null || lesson == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            if (lesson.OwnerId == userId
                || user.BoughtLessons.Any(x => x.Id == lessonId)
                || user.BoughtCourses.Any(x => x.Lessons.Any(x => x.Id == lessonId)))
            {
                return true;
            }

            return false;
        }
    }
}
