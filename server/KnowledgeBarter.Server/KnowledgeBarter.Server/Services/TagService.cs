using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Contracts;

namespace KnowledgeBarter.Server.Services
{
    public class TagService : ITagService
    {
        private readonly IRepository<Tag> tagRepository;

        public TagService(IRepository<Tag> tagRepository)
        {
            this.tagRepository = tagRepository;
        }

        public async Task<IEnumerable<Tag>> CreateManyAsync(string[] tags, int lessonId)
        {
            var createdTags = new List<Tag>();
            foreach (var tagText in tags)
            {
                var tag = new Tag() { Text = tagText, LessonId = lessonId };
                await tagRepository.AddAsync(tag);
                await tagRepository.SaveChangesAsync();
                createdTags.Add(tag);
            }

            return createdTags;
        }
    }
}
