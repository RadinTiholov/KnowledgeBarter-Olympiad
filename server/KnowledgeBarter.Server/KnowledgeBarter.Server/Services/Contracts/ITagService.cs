using KnowledgeBarter.Server.Data.Models;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ITagService
    {
        Task<IEnumerable<Tag>> CreateManyAsync(string[] tags, int lessonId);
    }
}
