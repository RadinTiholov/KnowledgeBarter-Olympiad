using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Services;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Tests.Service_Data_Tests
{
    public class IdentityServiceTests
    {
        private IRepository<ApplicationUser> applicationUserRepository;
        private UserManager<ApplicationUser> userManager;
        private IIdentityService identityService;

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

            var userManagerMock = new Mock<UserManager<ApplicationUser>>(Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);

            userManagerMock.Setup(x => x.IsInRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync((ApplicationUser user, string role) =>
                {
                    if (user.Id == "TestId")
                    {
                        return false;
                    }

                    return true;
                });

            userManagerMock.Setup(x => x.FindByIdAsync("userId1"))
               .Returns(async (string role) =>
               {
                   await Task.Delay(0);

                   return true;
               });

            userManagerMock.Setup(x => x.FindByIdAsync("userId2"))
               .Returns(async (string role) =>
               {
                   await Task.Delay(0);

                   return false;
               });

            this.userManager = userManagerMock.Object;

            this.identityService = new IdentityService(this.applicationUserRepository, this.userManager);
        }
    }
}
