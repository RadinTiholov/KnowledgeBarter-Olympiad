using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Contracts;

namespace KnowledgeBarter.Server.Services
{
    public class ImageService : IImageService
    {
        private readonly IRepository<Image> imageRepository;

        public ImageService(IRepository<Image> imageRepository)
        {
            this.imageRepository = imageRepository;
        }

        public async Task<Image> CreateAsync(string url)
        {
            var image = new Image()
            {
                Url = url,
            };

            await this.imageRepository.AddAsync(image);
            await this.imageRepository.SaveChangesAsync();

            return image;
        }
    }
}
