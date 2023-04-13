using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Models.Identity;
using KnowledgeBarter.Server.Services;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Reflection;
using Xunit;

namespace Tests.Service_Data_Tests
{
    public class IdentityServiceTests
    {
        private IRepository<ApplicationUser> applicationUserRepository;
        private IRepository<Image> imageRepository;
        private IRepository<Lesson> lessonRepository;
        private ICloudinaryService cloudinaryService;
        private UserManager<ApplicationUser> userManager;
        private IIdentityService identityService;
        private IImageService imageService;

        private KnowledgeBarterDbContext knowledgeBarterDbContext;

        public IdentityServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbIdentity")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.applicationUserRepository = new EfRepository<ApplicationUser>(this.knowledgeBarterDbContext);
            this.imageRepository = new EfRepository<Image>(this.knowledgeBarterDbContext);
            this.lessonRepository = new EfRepository<Lesson>(this.knowledgeBarterDbContext);

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

            var mockCloudinaryService = new Mock<ICloudinaryService>();

            mockCloudinaryService.Setup(x => x.UploadAsync(It.IsAny<IFormFile>(), It.IsAny<string>()))
                .ReturnsAsync(() =>
                {
                    return "testUrl";
                });

            this.cloudinaryService = mockCloudinaryService.Object;
            this.userManager = userManagerMock.Object;

            this.imageService = new ImageService(this.imageRepository, this.cloudinaryService, this.lessonRepository);
            this.identityService = new IdentityService(this.applicationUserRepository, this.userManager, this.imageService);
        }

        [Fact]
        public async Task UpdatePointsShouldWorkCorrectly()
        {
            await this.SeedData();

            await identityService.UpdatePoints("userId1", 100);

            var user = await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId1").FirstAsync();

            Assert.Equal(100, user.KBPoints);
        }

        [Fact]
        public async Task GetUserAsyncShouldWorkCorrectly()
        {
            await this.SeedData();

            var user = await this.identityService.GetUserAsync("userId1");

            Assert.NotNull(user);
        }

        [Fact]
        public async Task GetUserInformationAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(UserInformationResponseModel).GetTypeInfo().Assembly);

            await this.SeedData();

            var user = await this.identityService.GetUserInformationAsync("userId1");

            Assert.NotNull(user);
            Assert.Equal("Test", user.UserName);
        }

        [Fact]
        public async Task SubtractPointsAsyncShouldWorkCorrectly()
        {
            await this.SeedData();

            await identityService.SubtractPointsAsync("userId2", 100);

            var user = await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId2").FirstAsync();

            Assert.Equal(0, user.KBPoints);
        }

        [Fact]
        public async Task GetIdentityProfileAsyncShouldWorkCorrectly()
        {
            await this.SeedData();

            var data = await this.identityService.GetIdentityProfileAsync("userId1");

            Assert.True(data != null);
            Assert.Equal("TestEmail", data.Email);
        }

        [Fact]
        public async Task GenerateJwtTokenShouldWorkCorrectly()
        {
            await this.SeedData();

            var token = this.identityService.GenerateJwtToken("userId2", "Test", "Administrator", "tesassasdasdasdt");

            Assert.NotNull(token);
        }

        [Fact]
        public async Task UserInRoleAsyncShouldWorkCorrectlyWhenTrue()
        {
            await this.SeedData();

            var result = await this.identityService.IsUserInRoleAsync("userId1", "Test1");

            Assert.True(result);
        }

        [Fact]
        public async Task UserInRoleAsyncShouldWorkCorrectlyWhenFalse()
        {
            await this.SeedData();

            var result = await this.identityService.IsUserInRoleAsync("userId2", "Test2");

            Assert.False(result);
        }

        public async Task SeedData()
        {
            var image = new Image()
            {
                Id = 1,
                Url = "aaaaaaaaaaa",
            };
            var applicationUser1 = new ApplicationUser()
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
                KBPoints = 100,
                UserName = "Test2",
                Email = "TestEmail2",
                Image = image,
                ImageId = 1,
            };

            await this.knowledgeBarterDbContext.Users.AddAsync(applicationUser1);
            await this.knowledgeBarterDbContext.Users.AddAsync(applicationUser2);

            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }
    }
}
