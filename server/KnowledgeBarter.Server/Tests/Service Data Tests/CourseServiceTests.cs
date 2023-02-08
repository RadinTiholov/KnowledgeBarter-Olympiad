using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Contracts;

namespace Tests.Service_Data_Tests
{
    public class CourseServiceTests
    {
        private IDeletableEntityRepository<Course> courseRepository;
        private IRepository<ApplicationUser> applicationUserRepository;
        private IImageService imageService;
        private IRepository<Lesson> lessonRepository;
        private IIdentityService identityService;
        private ILikeService likeService;

        private KnowledgeBarterDbContext knowledgeBarterDbContext;
        private ICourseService courseService;

        public CourseServiceTests()
        {

        }
    }
}
