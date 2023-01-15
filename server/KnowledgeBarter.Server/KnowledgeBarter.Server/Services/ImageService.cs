using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace KnowledgeBarter.Server.Services
{
    public class ImageService : IImageService
    {
        private readonly IRepository<Image> imageRepository;
        private readonly ICloudinaryService cloudinaryService;

        public ImageService(IRepository<Image> imageRepository,
            ICloudinaryService cloudinaryService)
        {
            this.imageRepository = imageRepository;
            this.cloudinaryService = cloudinaryService;
        }

        public async Task<Image> AddByUrlAsync(string url)
        {
            Image image = await this.GetByUrlAsync(url);
            if (image != null)
            {
                return image;
            }

            image = new Image()
            {
                Url = url,
            };

            await this.imageRepository.AddAsync(image);
            await this.imageRepository.SaveChangesAsync();
            return await this.GetByUrlAsync(image.Url);
        }

        public async Task<Image> CreateAsync(IFormFile file)
        {
            // Save image to Cloudinary
            var imageUrl = await this.cloudinaryService
                .UploadAsync(file, file.Name);

            // Check if it exists
            var existingImage = await this.imageRepository
                .All()
                .Where(i => i.Url == imageUrl)
                .FirstOrDefaultAsync();

            if (existingImage != null)
            {
                return existingImage;
            }

            // Save to db
            var image = new Image() { Url = imageUrl };
            await this.imageRepository.AddAsync(image);
            await this.imageRepository.SaveChangesAsync();

            return await this.GetByUrlAsync(imageUrl);
        }
        private async Task<Image> GetByUrlAsync(string url)
        {
            return await this.imageRepository.AllAsNoTracking().Where(x => x.Url == url).FirstOrDefaultAsync();
        }
    }
}
