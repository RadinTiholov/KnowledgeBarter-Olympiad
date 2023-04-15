using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services;
using Moq;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Message;
using Xunit;
using KnowledgeBarter.Server.Data;
using Microsoft.EntityFrameworkCore;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Services.Mapping;
using System.Reflection;

namespace Tests.Service_Data_Tests
{
    public class MessageServiceTests
    {
        private IIdentityService identityService;
        private IRepository<Message> messageRepository;
        private IMessageService messageService;

        private KnowledgeBarterDbContext knowledgeBarterDbContext;

        public MessageServiceTests()
        {
            var contextOptions = new DbContextOptionsBuilder<KnowledgeBarterDbContext>()
            .UseInMemoryDatabase("KnowledgeBarterDbMessage")
            .Options;

            this.knowledgeBarterDbContext = new KnowledgeBarterDbContext(contextOptions);

            this.knowledgeBarterDbContext.Database.EnsureDeleted();
            this.knowledgeBarterDbContext.Database.EnsureCreated();

            this.messageRepository = new EfRepository<Message>(this.knowledgeBarterDbContext);

            var mockIdentityService = new Mock<IIdentityService>();

            mockIdentityService.Setup(x => x.GetIdByUsernameAsync("Test2"))
                .ThrowsAsync(new ArgumentException());

            mockIdentityService.Setup(x => x.GetIdByUsernameAsync("Test1"))
                .ReturnsAsync("userId1");

            this.identityService = mockIdentityService.Object;

            this.messageService = new MessageService(this.identityService, this.messageRepository);
        }

        [Fact]
        public async Task CreateAsyncShouldThrowArgumentExceptionWhenReceiverNotFound()
        {
            await this.SeedLessons();

            var model = new CreateMessageRequestModel()
            {
                Text = "test",
                ReceiverUsername = "Test2",
            };

            await Assert.ThrowsAsync<ArgumentException>(async () => { await this.messageService.CreateAsync(model, "test"); });
        }

        [Fact]
        public async Task CreateAsyncShouldWorkCorRectly()
        {
            await this.SeedLessons();
            AutoMapperConfig.RegisterMappings(typeof(CreateMessageResponseModel).GetTypeInfo().Assembly);

            var model = new CreateMessageRequestModel()
            {
                Text = "message form user 2",
                ReceiverUsername = "Test1",
            };

            await this.messageService.CreateAsync(model, "userId2");

            var messages = await this.messageRepository
                .AllAsNoTracking()
                .ToListAsync();

            Assert.Equal(2, messages.Count);
        }

        [Fact]
        public async Task GetAllForUsersAsyncShouldWorkCorrectly()
        {
            await this.SeedLessons();
            AutoMapperConfig.RegisterMappings(typeof(MessageInListViewModel).GetTypeInfo().Assembly);

            var result = await this.messageService.GetAllForUsersAsync("Test", "Test2");

            Assert.Single(result);
            Assert.Equal("Test", result[0].SenderUsername);
            Assert.Equal("Test2", result[0].ReceiverUsername);
        }

        [Fact]
        public async Task GetDistinctContactsAsyncShouldWorkCorrectly()
        {
            await this.SeedLessons();

            var result = await this.messageService.GetDistinctContactsAsync("Test");

            Assert.Equal(2, result.Count);
            Assert.Equal("userId1", result[0]);
        }

        private async Task SeedLessons()
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

            var message = new Message()
            {
                Id = 1,
                Text = "testMessage",
                SenderId = "userId1",
                Sender = applicationUser1,
                ReceiverId = "userId2",
                Receiver = applicationUser2,
            };

            await this.knowledgeBarterDbContext.Users.AddAsync(applicationUser1);
            await this.knowledgeBarterDbContext.Users.AddAsync(applicationUser2);
            await this.knowledgeBarterDbContext.Messages.AddAsync(message);

            await this.knowledgeBarterDbContext.SaveChangesAsync();
        }
    }
}
