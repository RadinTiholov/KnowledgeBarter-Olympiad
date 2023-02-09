using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Models.Course;
using KnowledgeBarter.Server.Models.Course.Base;
using KnowledgeBarter.Server.Services;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Moq;
using System.Reflection;
using Xunit;

namespace Tests.Service_Data_Tests
{
    public class CourseServiceTests
    {
        private IFormFile formFile;
        private IDeletableEntityRepository<Course> courseRepository;
        private IRepository<ApplicationUser> applicationUserRepository;
        private IRepository<Lesson> lessonRepository;
        private IImageService imageService;
        private IIdentityService identityService;
        private ILikeService likeService;

        private IRepository<Image> imageRepository;
        private ICloudinaryService cloudinaryService;

        private IRepository<Like> likeRepository;
        private UserManager<ApplicationUser> userManager;

        private KnowledgeBarterDbContext knowledgeBarterDbContext;
        private ICourseService courseService;

        public CourseServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbCourse")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.courseRepository = new EfDeletableEntityRepository<Course>(this.knowledgeBarterDbContext);
            this.applicationUserRepository = new EfRepository<ApplicationUser>(this.knowledgeBarterDbContext);
            this.lessonRepository = new EfRepository<Lesson>(this.knowledgeBarterDbContext);
            this.imageRepository = new EfRepository<Image>(this.knowledgeBarterDbContext);
            this.likeRepository = new EfRepository<Like>(this.knowledgeBarterDbContext);

            this.formFile = this.CreateFakeFormFile();
            var mockCloudinaryService = new Mock<ICloudinaryService>();
            mockCloudinaryService.Setup(x => x.UploadAsync(It.IsAny<IFormFile>(), It.IsAny<string>()))
                .ReturnsAsync(() =>
                {
                    return "testUrl";
                });

            var userManagerMock = new Mock<UserManager<ApplicationUser>>(Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);

            userManagerMock.Setup(x => x.IsInRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync((ApplicationUser user, string role) =>
                {
                    if (role == "Test1")
                    {
                        return true;
                    }

                    return false;
                });


            userManagerMock.Setup(x => x.FindByIdAsync("userId1"))
               .Returns(async (string role) =>
               {
                   await Task.Delay(0);

                   return await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId1").FirstAsync();
               });


            this.userManager = userManagerMock.Object;

            this.cloudinaryService = mockCloudinaryService.Object;

            this.imageService = new ImageService(this.imageRepository, this.cloudinaryService, this.lessonRepository);
            this.likeService = new LikeService(this.likeRepository);
            this.identityService = new IdentityService(this.applicationUserRepository, this.userManager);

            this.courseService = new CourseService(
                this.courseRepository,
                this.imageService,
                this.lessonRepository,
                this.identityService,
                this.likeService,
                this.applicationUserRepository);
        }

        [Fact]
        public async Task IsBoughtOrOwnerAsyncShouldWorkCorrectlyWhenTrue()
        {
            await this.SeedData();

            var result = await this.courseService.IsBoughtOrOwnerAsync(1, "userId1");

            Assert.True(result);
        }

        [Fact]
        public async Task IsBoughtOrOwnerAsyncShouldWorkCorrectlyWhenFalse()
        {
            await this.SeedData();

            var result = await this.courseService.IsBoughtOrOwnerAsync(1, "userId2");

            Assert.False(result);
        }

        [Fact]
        public async Task IsBoughtOrOwnerAsyncShouldThrowExWhen()
        {
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.IsBoughtOrOwnerAsync(1, "userId32"); });
        }

        [Fact]
        public async Task AllAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(CourseInListResponseModel).GetTypeInfo().Assembly);

            await this.SeedData();

            var courses = await this.courseService.AllAsync();

            Assert.Single(courses);
        }

        [Fact]
        public async Task HighestAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(CourseInListResponseModel).GetTypeInfo().Assembly);

            await this.SeedData();

            var courses = await this.courseService.HighestAsync();

            Assert.Single(courses);
        }

        [Fact]
        public async Task GetOneAsyncShouldThrowExWhenNotFound()
        {
            AutoMapperConfig.RegisterMappings(typeof(BaseCourseDetailsResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.GetOneAsync<BaseCourseDetailsResponseModel>(2); });
        }

        [Fact]
        public async Task GetOneAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(BaseCourseDetailsResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            var course = await this.courseService.GetOneAsync<BaseCourseDetailsResponseModel>(1);

            Assert.True(course != null);
            Assert.Equal("Test", course.Title);
        }

        [Fact]
        public async Task GetOneAsyncShouldWorkCorrectlyWhenBought()
        {
            AutoMapperConfig.RegisterMappings(typeof(BoughtCourseDetailsResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            var course = await this.courseService.GetOneAsync<BoughtCourseDetailsResponseModel>(1);

            Assert.True(course != null);
            Assert.Equal("Test", course.Title);
        }

        [Fact]
        public async Task DeleteAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(CourseInListResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            await this.courseService.DeleteAsync(1, "userId1");

            var courses = await this.courseService.AllAsync();

            Assert.Empty(courses);
        }

        [Fact]
        public async Task DeleteAsyncShouldThrowExWhenNotFound()
        {
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.DeleteAsync(12, "userId1"); });
        }

        [Fact]
        public async Task DeleteAsyncShouldThrowExWhenNotOwner()
        {
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.DeleteAsync(1, "userId2"); });
        }

        [Fact]
        public async Task LikeAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(BoughtCourseDetailsResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            await this.courseService.LikeAsync(1, "userId2");

            var course = await this.courseService.GetOneAsync<BoughtCourseDetailsResponseModel>(1);

            Assert.Equal(2, course.Likes);
        }

        [Fact]
        public async Task LikeAsyncShouldThrowExWhenOwner()
        {
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.LikeAsync(1, "userId1"); });
        }

        [Fact]
        public async Task LikeAsyncShouldThrowExWhenNotFound()
        {
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.LikeAsync(4, "userId3"); });
        }

        [Fact]
        public async Task BuyAsyncShouldWorkCorrectly()
        {
            await this.SeedData();

            await this.courseService.BuyAsync(1, "userId2");

            var user = await this.knowledgeBarterDbContext
                .Users
                .Include(x => x.BoughtCourses)
                .Where(x => x.Id == "userId2")
                .FirstAsync();

            Assert.Equal(19500, user.KBPoints);
            Assert.Equal(1, user.BoughtCourses.Count);
        }

        [Fact]
        public async Task BuyAsyncShouldThrowExWhenNotFound()
        {
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.BuyAsync(3, "userId1"); });
        }

        [Fact]
        public async Task BuyAsyncShouldThrowExWhenOwner()
        {
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.BuyAsync(1, "userId1"); });
        }

        [Fact]
        public async Task BuyAsyncShouldThrowExWhenNotEnoghtPoints()
        {
            await this.SeedData();
            var user = await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId2").FirstAsync();

            user.KBPoints = 0;

            this.knowledgeBarterDbContext.Users.Update(user);
            await this.knowledgeBarterDbContext.SaveChangesAsync();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.BuyAsync(1, "userId2"); });
        }

        [Fact]
        public async Task CreateAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(CreateCourseResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            await this.SeedLessons();


            var model = new CreateCourseRequestModel()
            {
                Title = "Test11",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3, 4, 5, 6 }
            };

            var response = await this.courseService.CreateAsync(model, "userId1");

            var courses = await this.courseService.AllAsync();

            Assert.NotEmpty(courses);
            Assert.Equal(2, courses.Count());
        }

        [Fact]
        public async Task CreateAsyncShouldThrowExWhenNotEnough()
        {
            await this.SeedData();

            await this.SeedLessons();

            var model = new CreateCourseRequestModel()
            {
                Title = "Test11",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3, 4 }
            };

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.CreateAsync(model, "userId1"); });
        }

        [Fact]
        public async Task CreateAsyncShouldThrowExWhenDistinct()
        {
            await this.SeedData();

            await this.SeedLessons();

            var model = new CreateCourseRequestModel()
            {
                Title = "Test11",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3, 4, 4, 4, 4 }
            };

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.CreateAsync(model, "userId1"); });
        }

        [Fact]
        public async Task CreateAsyncShouldThrowExWhenFromDiffUser()
        {
            await this.SeedData();

            await this.SeedLessons();

            var model = new CreateCourseRequestModel()
            {
                Title = "Test11",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3, 4, 5, 6, 7 }
            };

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.CreateAsync(model, "userId1"); });
        }

        [Fact]
        public async Task EditAsyncShouldThrowExWhenNotFound()
        {
            await this.SeedData();

            await this.SeedLessons();

            var model = new EditCourseRequestModel()
            {
                Title = "Test11",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3, 4, 5, 6 }
            };

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.EditAsync(model, 4, "userId3"); });
        }

        [Fact]
        public async Task EditAsyncShouldThrowExWhenNotOwner()
        {
            await this.SeedData();

            await this.SeedLessons();

            var model = new EditCourseRequestModel()
            {
                Title = "Test11",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3, 4, 5, 6 }
            };

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.EditAsync(model, 1, "userId2"); });
        }

        [Fact]
        public async Task EditAsyncShouldThrowExWhenNotEnoughLessons()
        {
            await this.SeedData();

            await this.SeedLessons();

            var model = new EditCourseRequestModel()
            {
                Title = "Test11",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3 }
            };

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.EditAsync(model, 1, "userId1"); });
        }

        [Fact]
        public async Task EditAsyncShouldThrowExWhenNotLessonOwner()
        {
            await this.SeedData();

            await this.SeedLessons();

            var model = new EditCourseRequestModel()
            {
                Title = "Test11",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3, 4, 5, 7 }
            };

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.courseService.EditAsync(model, 1, "userId1"); });
        }

        [Fact]
        public async Task EditAsyncShouldWorkCorrectlyWhenImage()
        {
            AutoMapperConfig.RegisterMappings(typeof(EditCourseResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            await this.SeedLessons();

            var model = new EditCourseRequestModel()
            {
                Title = "TestUpdate",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Image = this.formFile,
                Lessons = new int[] { 1, 2, 3, 4, 5, 6 }
            };

            var result = await this.courseService.EditAsync(model, 1, "userId1");
            var images = await this.knowledgeBarterDbContext.Images.ToListAsync();

            Assert.Equal("TestUpdate", result.Title);
            Assert.Equal(3, images.Count);
        }
        [Fact]
        public async Task EditAsyncShouldWorkCorrectlyWhenImageIsNotUpload()
        {
            AutoMapperConfig.RegisterMappings(typeof(EditCourseResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            await this.SeedLessons();

            var model = new EditCourseRequestModel()
            {
                Title = "TestUpdate",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Lessons = new int[] { 1, 2, 3, 4, 5, 6 }
            };

            var result = await this.courseService.EditAsync(model, 1, "userId1");
            var images = await this.knowledgeBarterDbContext.Images.ToListAsync();

            Assert.Equal("TestUpdate", result.Title);
            Assert.Equal(2, images.Count);
        }

        private async Task SeedLessons()
        {
            var image = new Image()
            {
                Id = 2,
                Url = "aaaaaaaaaaa",
            };

            var applicationUser = await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId1").FirstAsync();
            var applicationUser2 = await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId2").FirstAsync();
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
                Views = 2,
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
                Views = 2,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 2,
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
                Views = 2,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 2,
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
                Views = 2,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 2,
            };
            var lesson6 = new Lesson()
            {
                Id = 6,
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
            var lesson7 = new Lesson()
            {
                Id = 7,
                Title = "aaaaaaaaaa",
                Article = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                OwnerId = "userId2",
                Owner = applicationUser2,
                ImageId = 1,
                Image = image,
                Views = 2,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 2,
            };


            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson1);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson2);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson3);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson4);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson5);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson6);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson7);

            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }

        public async Task SeedData()
        {
            var image = new Image()
            {
                Id = 1,
                Url = "aaaaaaaaaaa",
            };

            var applicationUser = new ApplicationUser()
            {
                Id = "userId1",
                KBPoints = 0,
                UserName = "Test",
                Email = "TestEmail",
                Image = image,
                ImageId = 1,
            };
            var applicationUser2 = new ApplicationUser()
            {
                Id = "userId2",
                KBPoints = 20000,
                UserName = "Test2",
                Email = "TestEmail2",
                Image = image,
                ImageId = 1,
            };
            var course = new Course()
            {
                Id = 1,
                Title = "Test",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 500,
                Image = image,
                ImageId = 1,
                Owner = applicationUser,
                OwnerId = "userId1",
            };
            var like = new Like()
            {
                Owner = applicationUser,
                OwnerId = "userId1",
                Course = course,
                CourseId = course.Id,
            };
            course.Likes.Add(like);

            await this.knowledgeBarterDbContext.Users.AddAsync(applicationUser);
            await this.knowledgeBarterDbContext.Users.AddAsync(applicationUser2);
            await this.knowledgeBarterDbContext.Courses.AddAsync(course);

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
