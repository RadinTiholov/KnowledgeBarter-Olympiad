using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Data.Models;
using Microsoft.EntityFrameworkCore;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Services;
using Xunit;

namespace Tests.Service_Data_Tests
{
    public class TagServiceTests
    {
        private IRepository<Tag> tagRepository;
        private ITagService tagService;

        private KnowledgeBarterDbContext knowledgeBarterDbContext;

        public TagServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbTag")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.tagRepository = new EfRepository<Tag>(this.knowledgeBarterDbContext);

            this.tagService = new TagService(this.tagRepository);
        }

        [Fact]
        public async Task CreateManyAsyncShouldWorkCorrectly()
        {
            await this.SeedData();

            var tags = new string[] { "1", "2", "3" };

            var createdTags = await this.tagService.CreateManyAsync(tags, 1);

            var allTags = await this.tagRepository.AllAsNoTracking().ToListAsync();

            Assert.Equal(3, allTags.Count);
            Assert.Equal(3, createdTags.ToList().Count);
        }

        [Fact]
        public async Task CreateManyAsyncWhenNoTagsShouldWorkCorrectly()
        {
            await this.SeedData();

            var tags = new string[] { "1" };

            var createdTags = await this.tagService.CreateManyAsync(tags, 2);

            var allTags = await this.tagRepository.AllAsNoTracking().ToListAsync();

            Assert.Equal(3, allTags.Count);
            Assert.Equal(1, createdTags.ToList().Count);
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
                Id = "userId",
                KBPoints = 0,
                UserName = "Test",
                Email = "TestEmail",
                Image = image,
                ImageId = 1,
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
            var lesson2 = new Lesson()
            {
                Id = 2,
                Title = "aaaaaaaaaa2",
                Article = "aaaaaaaaaaaaaa2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                OwnerId = "userId",
                Owner = applicationUser,
                ImageId = 1,
                Image = image,
                Views = 1,
                Video = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                Price = 12,
            };
            var tag1 = new Tag()
            {
                Id = 1,
                Lesson = lesson,
                Text = "test1",
            };
            var tag2 = new Tag()
            {
                Id = 2,
                Lesson = lesson,
                Text = "test2",
            };

            await this.knowledgeBarterDbContext.Tags.AddAsync(tag1);
            await this.knowledgeBarterDbContext.Tags.AddAsync(tag2);
            await this.knowledgeBarterDbContext.Lessons.AddAsync(lesson2);

            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }
    }
}
