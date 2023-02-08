using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Services;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Tests.Service_Data_Tests
{
    public class ImageServiceTests
    {
        private IRepository<Image> imageRepository;
        private IRepository<Lesson> lessonRepository;
        private ICloudinaryService cloudinaryService;
        private IImageService imageService;

        private KnowledgeBarterDbContext knowledgeBarterDbContext;

        public ImageServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbImage")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.imageRepository = new EfRepository<Image>(this.knowledgeBarterDbContext);
            this.lessonRepository = new EfRepository<Lesson>(this.knowledgeBarterDbContext);

            var mockCloudinaryService = new Mock<ICloudinaryService>();
            mockCloudinaryService.Setup(x => x.UploadAsync(It.IsAny<IFormFile>(), It.IsAny<string>()))
                .ReturnsAsync(() =>
                {
                    return "testUrl";
                });

            this.cloudinaryService = mockCloudinaryService.Object;

            this.imageService = new ImageService(this.imageRepository, this.cloudinaryService, this.lessonRepository);
        }

        [Fact]
        public async Task AddByUrlAsyncShouldWorkFine()
        {
            await this.SeedData();

            var image = await this.imageService.AddByUrlAsync("1111");
            var images = await this.knowledgeBarterDbContext.Images.ToListAsync();
            Assert.Equal(2, images.Count);
            Assert.Equal("1111", image.Url);
        }

        [Fact]
        public async Task CreateAsyncShouldWorkCorrectly()
        {
            await this.SeedData();

            var file = this.CreateFakeFormFile();
            var image = await this.imageService.CreateAsync(file);

            var images = await this.knowledgeBarterDbContext.Images.ToListAsync();
            Assert.Equal(3, images.Count);
        }

        [Fact]
        public async Task CreateAsyncShouldReturnsImageWhenExists()
        {
            await this.SeedData();

            var file = this.CreateFakeFormFile();
            var image = await this.imageService.CreateAsync(file);
            var image2 = await this.imageService.CreateAsync(file);

            Assert.Equal(image, image2);
        }

        private async Task SeedData()
        {
            var firstImage = new Image()
            {
                Id = 1,
                Url = "1111",
            };
            var secondImage = new Image()
            {
                Id = 2,
                Url = "2222",
            };
            await this.knowledgeBarterDbContext.Images.AddAsync(firstImage);
            await this.knowledgeBarterDbContext.Images.AddAsync(secondImage);
            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }

        private IFormFile CreateFakeFormFile()
        {
            var content = "Fake";
            var fileName = "test1";
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(content);
            writer.Flush();
            stream.Position = 0;

            return new FormFile(stream, 0, stream.Length, "id", fileName);
        }
    }
}
