using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Comments;
using KnowledgeBarter.Server.Models.Lesson;
using KnowledgeBarter.Server.Services.Contracts;

namespace KnowledgeBarter.Server.Services
{
    public class CommentService : ICommentService
    {
        private readonly IRepository<Comment> commentRepository;

        public CommentService(IRepository<Comment> commentRepository)
        {
            this.commentRepository = commentRepository;
        }

        public Task<IEnumerable<CommentInListResponseModel>> AllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<CreateLessonResponseModel> CreateAsync(CreateLesssonRequestModel model, string userId)
        {


            //var image = await this.imageService.CreateAsync(model.Image);

            //var lesson = new Lesson()
            //{
            //    Title = model.Title,
            //    Description = model.Description,
            //    Article = model.Article,
            //    Video = model.Video,
            //    ImageId = image.Id,
            //    Resources = model.Resources,
            //    Views = 0,
            //    Price = 100,
            //    OwnerId = userId,
            //};

            //await this.lessonRepository.AddAsync(lesson);
            //await this.lessonRepository.SaveChangesAsync();

            //var tags = await this.tagService.CreateManyAsync(model.Tags, lesson.Id);
            //lesson.Tags = (ICollection<Tag>)tags;

            //this.lessonRepository.Update(lesson);
            //await this.lessonRepository.SaveChangesAsync();

            //Add 100 KB points to the user as a reward
            //await this.identityService.UpdatePoints(userId, 100);

            //return await this.lessonRepository
            //    .All()
            //    .Where(x => x.Id == lesson.Id)
            //    .To<CreateLessonResponseModel>()
            //    .FirstAsync();
        }
    }
}
