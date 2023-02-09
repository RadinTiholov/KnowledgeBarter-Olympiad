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
using KnowledgeBarter.Server.Models.Course.Base;
using KnowledgeBarter.Server.Models.Lesson.Base;

namespace Tests.Service_Data_Tests
{
    public class LessonServiceTests
    {
        private IDeletableEntityRepository<Lesson> lessonRepository;
        private IRepository<Image> imageRepository;
        private IRepository<ApplicationUser> applicationUserRepository;
        private IRepository<Like> likeRepository;

        private ILessonService lessonService;
        private IImageService imageService;
        private ITagService tagService;
        private IIdentityService identityService;
        private ILikeService likeService;

        private KnowledgeBarterDbContext knowledgeBarterDbContext;

        private IFormFile formFile;

        public LessonServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbLesson")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.lessonRepository = new EfDeletableEntityRepository<Lesson>(this.knowledgeBarterDbContext);
            this.imageRepository = new EfRepository<Image>(this.knowledgeBarterDbContext);
            this.applicationUserRepository = new EfRepository<ApplicationUser>(this.knowledgeBarterDbContext);
            this.likeRepository = new EfRepository<Like>(this.knowledgeBarterDbContext);

            this.formFile = this.CreateFakeFormFile();

            //var mockImageService = new Mock<IImageService>();
            //mockImageService.Setup(x => x.CreateAsync(It.IsAny<IFormFile>()))
            //    .ReturnsAsync((IFormFile formFile) =>
            //    {
            //        var image = new Image();
            //        return image;
            //    });

            //this.imageService = mockImageService.Object;

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
                    var user = this.knowledgeBarterDbContext.Users.Where(x => x.Id == id).FirstOrDefault();
                    return user;
                });

            this.identityService = mockIdentityService.Object;

            var mockLikeService = new Mock<ILikeService>();
            mockLikeService.Setup(x => x.LikeLessonAsync(It.IsAny<int>(), It.IsAny<string>()))
                .Returns(async (int lessonId, string userId) =>
                {
                    var like = new Like()
                    {
                        LessonId = lessonId,
                        OwnerId = userId,
                    };

                    await this.likeRepository.AddAsync(like);
                    await this.likeRepository.SaveChangesAsync();

                    return like;
                });

            var mockCloudinaryService = new Mock<ICloudinaryService>();
            mockCloudinaryService.Setup(x => x.UploadAsync(It.IsAny<IFormFile>(), It.IsAny<string>()))
                .ReturnsAsync(() =>
                {
                    return "testUrl";
                });


            this.likeService = mockLikeService.Object;

            this.imageService = new ImageService(imageRepository, mockCloudinaryService.Object, lessonRepository);
            this.lessonService = new LessonService(lessonRepository, applicationUserRepository, imageService, tagService, identityService, likeService);
        }

        [Fact]
        public async Task AllAsyncShouldWorkFine()
        {
            AutoMapperConfig.RegisterMappings(typeof(LessonInListResponseModel).GetTypeInfo().Assembly);
            await this.SeedDataAsync();

            var lessons = await this.lessonService.AllAsync();

            Assert.Equal(6, lessons.Count());
        }

        [Fact]
        public async Task DeleteAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            await this.lessonService.DeleteAsync(1, "userId");
            var lessons = await this.lessonRepository.AllAsNoTracking().ToListAsync();

            Assert.Equal(5, lessons.Count());
        }

        [Fact]
        public async Task DeleteAsyncShouldThrowException()
        {
            await this.SeedDataAsync();
            
            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.DeleteAsync(1, "userId32"); });
            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.DeleteAsync(1, "userId2"); });
        }

        [Fact]
        public async Task PopularAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            AutoMapperConfig.RegisterMappings(typeof(LessonInListResponseModel).GetTypeInfo().Assembly);

            var lessons = (await this.lessonService.PopularAsync()).ToList();

            Assert.Equal(4, lessons.Count());
            Assert.Equal(6, lessons[0].Id);
        }

        [Fact]
        public async Task RecommendedShouldWorkFine()
        {
            await this.SeedDataAsync();

            AutoMapperConfig.RegisterMappings(typeof(LessonInListResponseModel).GetTypeInfo().Assembly);

            var lessons = (await this.lessonService.RecommendedAsync("userId")).ToList();

            Assert.Equal(4, lessons.Count());
            Assert.Equal(6, lessons[0].Id);
        }

        [Fact]
        public async Task CreateAsyncShouldWorkFine()
        {
            AutoMapperConfig.RegisterMappings(typeof(CreateLessonResponseModel).GetTypeInfo().Assembly);

            await this.SeedDataAsync();

            CreateLessonRequestModel model = new CreateLessonRequestModel();
            model.Title = "Title";
            model.Description = "Description";
            model.Article = "Article";
            model.Video = "https:/google.com";
            model.Image = this.formFile;
            model.Tags = new string[] { "a" };

            var lesson = await lessonService.CreateAsync(model, "userId");

            var lessons = await this.lessonRepository.AllAsNoTracking().ToListAsync();

            Assert.Equal(7, lessons.Count);
        }

        [Fact]
        public async Task EditAsyncShouldWorkFine()
        {
            AutoMapperConfig.RegisterMappings(typeof(CreateLessonResponseModel).GetTypeInfo().Assembly);

            await this.SeedDataAsync();

            CreateLessonRequestModel model = new CreateLessonRequestModel();
            model.Title = "Title";
            model.Description = "Description";
            model.Article = "Article";
            model.Video = "https:/google.com";
            model.Image = this.formFile;
            model.Tags = new string[] { "a" };

            var lesson = await lessonService.CreateAsync(model, "userId");

            var lessons = await this.lessonRepository.AllAsNoTracking().ToListAsync();

            Assert.Equal(7, lessons.Count);
        }

        [Fact]
        public async Task EditAsyncShouldThrowException()
        {
            AutoMapperConfig.RegisterMappings(typeof(CreateLessonResponseModel).GetTypeInfo().Assembly);

            await this.SeedDataAsync();

            CreateLessonRequestModel model = new CreateLessonRequestModel();
            model.Title = "Title";
            model.Description = "Description";
            model.Article = "Article";
            model.Video = "https:/google.com";
            model.Image = this.formFile;
            model.Tags = new string[] { "a" };

            var lesson = await lessonService.CreateAsync(model, "userId");

            var lessons = await this.lessonRepository.AllAsNoTracking().ToListAsync();

            Assert.Equal(7, lessons.Count);
        }

        [Fact]
        public async Task IsBoughtOrOwnerAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            var isBoughtOrOwner = await this.lessonService.IsBoughtOrOwnerAsync(1, "userId");
            var isBoughtOrOwner2 = await this.lessonService.IsBoughtOrOwnerAsync(6, "userId");

            Assert.True(isBoughtOrOwner);
            Assert.False(isBoughtOrOwner2);
        }

        [Fact]
        public async Task IsBoughtOrOwnerAsyncShouldThrowException()
        {
            await this.SeedDataAsync();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.IsBoughtOrOwnerAsync(1, "userId32"); });
        }

        [Fact]
        public async Task BuyAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            await this.lessonService.BuyAsync(6, "userId");

            var user = await this.knowledgeBarterDbContext
                .Users
                .Include(x => x.BoughtCourses)
                .FirstAsync(x => x.Id == "userId");

            Assert.Equal(1, user.BoughtLessons.Count);
        }

        [Fact]
        public async Task ExistsAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            var exists = await this.lessonService.ExistsAsync(1);
            
            Assert.True(exists);
        }

        [Fact]
        public async Task BuyAsyncShouldThrowException()
        {
            await this.SeedDataAsync();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.BuyAsync(1, "userId32"); });
            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.BuyAsync(1, "userId"); });
            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.BuyAsync(1, "userId2"); });
        }

        [Fact]
        public async Task LikeAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            await this.lessonService.LikeAsync(6, "userId");

            var likes = await this.knowledgeBarterDbContext
                .Likes
                .Where(x => x.LessonId == 6)
                .ToListAsync();

            Assert.Single(likes);
        }

        [Fact]
        public async Task GetOneAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(BaseLessonDetailsResponseModel).GetTypeInfo().Assembly);
            await this.SeedDataAsync();

            var lesson = await this.lessonService.GetOneAsync<BaseLessonDetailsResponseModel>(1);

            Assert.True(lesson != null);
            Assert.Equal(1, lesson.Views);
        }

        [Fact]
        public async Task GetOneAsyncShouldThrowException()
        {
            AutoMapperConfig.RegisterMappings(typeof(BaseLessonDetailsResponseModel).GetTypeInfo().Assembly);
            await this.SeedDataAsync();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.GetOneAsync<BaseLessonDetailsResponseModel>(69); });
        }

        [Fact]
        public async Task LikeAsyncShouldThrowException()
        {
            await this.SeedDataAsync();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.LikeAsync(1, "userId32"); });
            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.lessonService.LikeAsync(1, "userId"); });
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
                KBPoints = 2000,
                UserName = "Test",
                Email = "TestEmail",
                Image = image,
                ImageId = 1,
            };

            var applicationUser2 = new ApplicationUser()
            {
                Id = "userId2",
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

            var lesson3 = new Lesson()
            {
                Id = 3,
                Title = "aaaaaaaaaa",
                Article = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                OwnerId = "userId",
                Owner = applicationUser,
                ImageId = 1,
                Image = image,
                Views = 3,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 3,
            };

            var lesson4 = new Lesson()
            {
                Id = 4,
                Title = "aaaaaaaaaa",
                Article = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                OwnerId = "userId",
                Owner = applicationUser,
                ImageId = 1,
                Image = image,
                Views = 4,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 4,
            };

            var lesson5 = new Lesson()
            {
                Id = 5,
                Title = "aaaaaaaaaa",
                Article = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                OwnerId = "userId",
                Owner = applicationUser,
                ImageId = 1,
                Image = image,
                Views = 5,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 5,
            };

            var lesson6 = new Lesson()
            {
                Id = 6,
                Title = "aaaaaaaaaa",
                Article = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                OwnerId = "userId",
                Owner = applicationUser2,
                ImageId = 1,
                Image = image,
                Views = 6,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 6,
            };

            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson1);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson2);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson3);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson4);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson5);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson6);

            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }

        private IFormFile CreateFakeFormFile()
        {
            var content = "Hello World from a Fake File";
            var fileName = "test";
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(content);
            writer.Flush();
            stream.Position = 0;

            return new FormFile(stream, 0, stream.Length, "id_from_form", fileName);
        }
    }
}
