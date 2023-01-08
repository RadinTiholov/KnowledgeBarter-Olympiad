using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Course;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBarter.Server.Services
{
    public class CourseService : ICourseService
    {
        private readonly IDeletableEntityRepository<Course> courseRepository;

        public CourseService(IDeletableEntityRepository<Course> courseRepository)
        {
            this.courseRepository = courseRepository;
        }

        public async Task<IEnumerable<CourseInListResponseModel>> AllAsync()
        {
            return await this.courseRepository
                .AllAsNoTracking()
                .To<CourseInListResponseModel>()
                .ToListAsync();
        }
    }
}
