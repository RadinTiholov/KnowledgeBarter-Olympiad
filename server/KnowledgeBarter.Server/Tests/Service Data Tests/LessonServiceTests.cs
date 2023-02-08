using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Services.Contracts;
using Moq;
using Microsoft.AspNetCore.Http;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Services.Mapping;
using KnowledgeBarter.Server.Models.Lesson;
using System.Reflection;

namespace Tests.Service_Data_Tests
{
    public class LessonServiceTests
    {
        private IDeletableEntityRepository<Lesson> lessonRepository;
        private IRepository<ApplicationUser> applicationUserRepository;

        private ILessonService lessonService;
        private IImageService imageService;
        private ITagService tagService;
        private IIdentityService identityService;
        private ILikeService likeService;

        private KnowledgeBarterDbContext knowledgeBarterDbContext;

        public LessonServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbLesson")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.lessonRepository = new EfDeletableEntityRepository<Lesson>(this.knowledgeBarterDbContext);
            this.applicationUserRepository = new EfRepository<ApplicationUser>(this.knowledgeBarterDbContext);

            var mockImageService = new Mock<IImageService>();
            mockImageService.Setup(x => x.CreateAsync(It.IsAny<IFormFile>()))
                .ReturnsAsync(() =>
                {
                    var image = new Image();
                    return image;
                });

            this.imageService = mockImageService.Object;

            var mockTagService = new Mock<ITagService>();
            //mockTagService.Setup(x => x.CreateAsync(It.IsAny<IFormFile>()))
            //    .ReturnsAsync(() =>
            //    {
            //        var image = new Image();
            //        return image;
            //    });

            this.tagService = mockTagService.Object;


            var mockIdentityService = new Mock<IIdentityService>();
            mockIdentityService.Setup(x => x.GetUserAsync(It.IsAny<string>()))
                .ReturnsAsync((string id) =>
                {
                    var user = this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId").First();
                    return user;
                });

            this.identityService = mockIdentityService.Object;

            var mockLikeService = new Mock<ILikeService>();
            //mockLikeService.Setup(x => x.CreateAsync(It.IsAny<IFormFile>()))
            //    .ReturnsAsync(() =>
            //    {
            //        var image = new Image();
            //        return image;
            //    });

            this.likeService = mockLikeService.Object;

            this.lessonService = new LessonService(lessonRepository, applicationUserRepository, imageService, tagService, identityService, likeService);
        }

        [Fact]
        public async Task AllAsyncShouldWorkFine()
        {
            AutoMapperConfig.RegisterMappings(typeof(LessonInListResponseModel).GetTypeInfo().Assembly);
            await this.SeedDataAsync();

            var lessons = await this.lessonService.AllAsync();

            Assert.Equal(2, lessons.Count());
        }


        [Fact]
        public async Task DeleteAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            await this.lessonService.DeleteAsync(1, "userId");
            var lessons = await this.lessonRepository.AllAsNoTracking().ToListAsync();

            Assert.Single(lessons);
        }


        private async Task SeedDataAsync()
        {
            var image = new Image()
            {
                Id = 1,
                Url = "aaaaaaaaaaa",
            };

            var applicationUser = new ApplicationUser()
            {
                Id = "userId",
                KBPoints = 0,
                UserName = "Test",
                Email = "TestEmail",
                Image = image,
                ImageId = 1,
            };

            var lesson1 = new Lesson()
            {
                Id = 1,
                Title = "aaaaaaaaaa",
                Article = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                OwnerId = "userId",
                Owner = applicationUser,
                ImageId = 1,
                Image = image,
                Views = 1,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 2,
            };

            var lesson2 = new Lesson()
            {
                Id = 2,
                Title = "aaaaaaaaaa",
                Article = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                OwnerId = "userId",
                Owner = applicationUser,
                ImageId = 1,
                Image = image,
                Views = 2,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 2,
            };

            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson1);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson2);

            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }
    }
}
