using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Services;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Moq;

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

            var mockImageService = new Mock<IImageService>();
            mockImageService.Setup(x => x.CreateAsync(It.IsAny<IFormFile>()))
                .ReturnsAsync(() =>
                {
                    var image = new Image();
                    return image;
                });

            var mockIdentityService = new Mock<IIdentityService>();
            mockIdentityService.Setup(x => x.UpdatePoints(It.IsAny<string>(), It.IsAny<int>()))
                .Returns(async (string userId, int points) =>
                {
                    var user = await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId1").FirstAsync();

                    user.KBPoints += 500;

                    this.applicationUserRepository.Update(user);
                    await this.applicationUserRepository.SaveChangesAsync();
                });

            mockIdentityService.Setup(x => x.SubtractPointsAsync(It.IsAny<string>(), It.IsAny<int>()))
                .Returns(async (string userId, int points) =>
                {
                    var user = await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId1").FirstAsync();

                    user.KBPoints -= 500;

                    this.applicationUserRepository.Update(user);
                    await this.applicationUserRepository.SaveChangesAsync();
                });

            mockIdentityService.Setup(x => x.GetUserAsync(It.IsAny<string>()))
                .Returns(async (string userId) =>
                {
                    var user = await this.knowledgeBarterDbContext.Users.Where(x => x.Id == "userId1").FirstAsync();

                    return user;
                });

            mockIdentityService.Setup(x => x.IsUserInRoleAsync(It.IsAny<string>(), It.IsAny<string>()))
                 .ReturnsAsync((ApplicationUser user, string role) =>
                 {
                     if (role == "Test1")
                     {
                         return true;
                     }

                     return false;
                 });

            var mockLikeService = new Mock<ILikeService>();

            mockLikeService.Setup(x => x.LikeCourseAsync(It.IsAny<int>(), It.IsAny<string>()))
                .Returns(async (int courseId, string userId) =>
                {
                    var like = new Like()
                    {
                        CourseId = courseId,
                        OwnerId = userId,
                    };

                    await this.knowledgeBarterDbContext.Likes.AddAsync(like);
                    await this.knowledgeBarterDbContext.SaveChangesAsync();

                    return like;
                });

            this.imageService = mockImageService.Object;
            this.likeService = mockLikeService.Object;
            this.identityService = mockIdentityService.Object;

            this.courseService = new CourseService(
                this.courseRepository,
                this.imageService,
                this.lessonRepository,
                this.identityService,
                this.likeService,
                this.applicationUserRepository);
        }
    }
}
