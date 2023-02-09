using KnowledgeBarter.Server;
using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Services;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Tests.Service_Data_Tests
{
    public class CourseServiceTests
    {
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

            var result = await this.courseService.IsBoughtOrOwnerAsync(1, "userId2");

            Assert.False(result);
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
                KBPoints = 0,
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

            await this.knowledgeBarterDbContext.Users.AddAsync(applicationUser);
            await this.knowledgeBarterDbContext.Users.AddAsync(applicationUser2);
            await this.knowledgeBarterDbContext.Courses.AddAsync(course);

            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }
    }
}
