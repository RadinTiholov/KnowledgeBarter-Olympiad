using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Service_Data_Tests
{
    public class LikeServiceTests
    {
        private IRepository<Like> likeRepository;
        private ILikeService likeService;


        private KnowledgeBarterDbContext knowledgeBarterDbContext;

        public LikeServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbLike")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.likeRepository = new EfRepository<Like>(this.knowledgeBarterDbContext);

            this.likeService = new LikeService(likeRepository);
        }

        [Fact]
        public async Task LikeCourseAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            await this.likeService.LikeCourseAsync(1, "userId");

            var course = await this.knowledgeBarterDbContext.Courses.FirstOrDefaultAsync(x => x.Id == 1);

            Assert.Single(course.Likes);
        }


        [Fact]
        public async Task LikeLessonAsyncShouldWorkFine()
        {
            await this.SeedDataAsync();

            await this.likeService.LikeLessonAsync(1, "userId");

            var lesson = await this.knowledgeBarterDbContext.Lessons.FirstOrDefaultAsync(x => x.Id == 1);

            Assert.Single(lesson.Likes);
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

            var course = new Course()
            {
                Id = 1,
                Title = "Test",
                Description = "Test",
                Owner = applicationUser,
                Image = image,
                Price = 1
            };

            var lesson = new Lesson()
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

            await this.knowledgeBarterDbContext.Courses.AddAsync(course);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson);

            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }
    }
}
