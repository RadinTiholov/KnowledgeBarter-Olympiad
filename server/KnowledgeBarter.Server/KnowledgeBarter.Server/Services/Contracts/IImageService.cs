using KnowledgeBarter.Server.Data.Models;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface IImageService
    {
        public Task<Image> CreateAsync(string url);
    }
}
