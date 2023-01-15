using KnowledgeBarter.Server.Data.Models;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface IImageService
    {
        public Task<Image> CreateAsync(IFormFile file);

        Task<Image> AddByUrlAsync(string url);
    }
}
