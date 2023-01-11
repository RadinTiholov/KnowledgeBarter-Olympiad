using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Course;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;

using static KnowledgeBarter.Server.Services.ServiceConstants;

namespace KnowledgeBarter.Server.Services
{
    public class CourseService : ICourseService
    {
        private readonly IDeletableEntityRepository<Course> courseRepository;
        private readonly IImageService imageService;
        private readonly IRepository<Lesson> lessonRepository;
        private readonly IIdentityService identityService;


        public CourseService(IDeletableEntityRepository<Course> courseRepository,
            IImageService imageService,
            IRepository<Lesson> lessonRepository,
            IIdentityService identityService)
        {
            this.courseRepository = courseRepository;
            this.imageService = imageService;
            this.lessonRepository = lessonRepository;
            this.identityService = identityService;
        }

        public async Task<IEnumerable<CourseInListResponseModel>> AllAsync()
        {
            return await this.courseRepository
                .AllAsNoTracking()
                .To<CourseInListResponseModel>()
                .ToListAsync();
        }

        public async Task<CreateCourseResponseModel> CreateAsync(CreateCourseRequestModel model, string userId)
        {
            var image = await this.imageService.CreateAsync(model.Image);

            var lessons = await this.lessonRepository.All()
                .Where(x => model.Lessons.Contains(x.Id))
                .ToListAsync();

            if (lessons.Count < 6)
            {
                throw new ArgumentException(LessonsShouldBeMore);
            }

            if (lessons.Count != lessons.Distinct().Count())
            {
                throw new ArgumentException(Unauthorized);
            }

            if (lessons.Any(x => x.OwnerId != userId))
            {
                throw new ArgumentException(Unauthorized);
            }


            var course = new Course()
            {
                Title = model.Title,
                Description = model.Description,
                Image = image,
                OwnerId = userId,
                Price = 500,
                Lessons = lessons,
            };

            await this.courseRepository.AddAsync(course);
            await this.courseRepository.SaveChangesAsync();

            //Add 100 KB points to the user as a reward
            await this.identityService.UpdatePoints(userId, 500);

            var createdCourse = await this.courseRepository.All()
                .Where(x => x.Id == course.Id)
                .To<CreateCourseResponseModel>()
                .FirstAsync();

            createdCourse.Lessons = await this.lessonRepository
                .AllAsNoTracking()
                .Where(x => x.Courses.Any(x => x.Id == course.Id))
                .To<LessonInListResponseModel>()
                .ToListAsync();

            return createdCourse;
        }

        public async Task DeleteAsync(int courseId, string userId)
        {
            var user = await this.identityService.GetUserAsync(userId);
            var course = await this.GetCourseAsync(courseId);

            if (user == null || course == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            if (course.OwnerId != userId)
            {
                throw new ArgumentException(Unauthorized);
            }

            this.courseRepository.Delete(course);
            await this.courseRepository.SaveChangesAsync();
        }

        private async Task<Course> GetCourseAsync(int courseId)
        {
            return await this.courseRepository
                .All()
                .Where(x => x.Id == courseId)
                .FirstOrDefaultAsync();
        }

        public async Task<CourseDetailsResponseModel> GetOneAsync(int id)
        {
            var course = await this.courseRepository.All()
                .Where(x => x.Id == id)
                .To<CourseDetailsResponseModel>()
                .FirstOrDefaultAsync();

            if (course == null)
            {
                throw new ArgumentException(NotFoundMessage);
            }

            course.Lessons = await this.lessonRepository
                .AllAsNoTracking()
                .Where(x => x.Courses.Any(x => x.Id == id))
                .To<LessonInListResponseModel>()
                .ToListAsync();

            return course;
        }

        public async Task<IEnumerable<CourseInListResponseModel>> HighestAsync()
        {
            return await this.courseRepository
               .AllAsNoTracking()
               .Include(x => x.Likes)
               .OrderByDescending(x => x.Likes.Count())
               .Take(4)
               .To<CourseInListResponseModel>()
               .ToListAsync();
        }
    }
}
