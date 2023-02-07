using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Services;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML.Tokenizers;
using Moq;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.Service_Data_Tests
{
    public class CommentServiceTests
    {
        private IDeletableEntityRepository<Comment> commentRepository;
        private ILessonService lessonService;
        private ICommentService commentService;
        private KnowledgeBarterDbContext knowledgeBarterDbContext;

        public CommentServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbComments")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.commentRepository = new EfDeletableEntityRepository<Comment>(this.knowledgeBarterDbContext);

            var mockLessonService = new Mock<ILessonService>();
            mockLessonService.Setup(x => x.ExistsAsync(1))
                .ReturnsAsync(() =>
                {
                    return true;
                });
            mockLessonService.Setup(x => x.ExistsAsync(2))
                .ReturnsAsync(() =>
                {
                    return false;
                });

            this.lessonService = mockLessonService.Object;

            this.commentService = new CommentService(commentRepository, lessonService);
        }

        [Fact]
        public async Task AllAsyncShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(CommentWithPredictionInListResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            var comments = await this.commentService.AllAsync();

            Assert.Single(comments);
        }

        [Fact]
        public async Task CreateShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(CommentWithPredictionInListResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            var model = new CreateCommentRequestModel()
            {
                Text = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            };
            await this.commentService.CreateAsync(model, 1, "userId");
            var comments = await this.commentService.AllAsync();
            Assert.Equal(2, comments.ToList().Count);
        }

        [Fact]
        public async Task CreateShouldThrowExeptionWhenNotFound()
        {
            AutoMapperConfig.RegisterMappings(typeof(CommentWithPredictionInListResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            var model = new CreateCommentRequestModel()
            {
                Text = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            };

            await Assert.ThrowsAsync<ArgumentNullException>(async () => { await this.commentService.CreateAsync(model, 2, "userId"); });
        }

        [Fact]
        public async Task DeleteShouldWorkCorrectly()
        {
            AutoMapperConfig.RegisterMappings(typeof(CommentWithPredictionInListResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            await this.commentService.DeleteAsync(1);
            var clubs = await this.commentService.AllAsync();
            Assert.Empty(clubs);
        }

        [Fact]
        public async Task DeleteShouldThrowExeptionWhenNotFound()
        {
            AutoMapperConfig.RegisterMappings(typeof(CommentWithPredictionInListResponseModel).GetTypeInfo().Assembly);
            await this.SeedData();

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.commentService.DeleteAsync(2); });
        }

        private async Task SeedData()
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
            var comment = new Comment()
            {
                Id = 1,
                Text = "alalalalalla",
                OwnerId = "userId",
                Owner = applicationUser,
                LessonId = 1,
                Lesson = lesson,
            };
            await this.knowledgeBarterDbContext.Comments.AddAsync(comment);
            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }
    }
}
