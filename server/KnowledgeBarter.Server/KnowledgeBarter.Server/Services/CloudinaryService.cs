using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using KnowledgeBarter.Server.Services.Contracts;

namespace KnowledgeBarter.Server.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary cloudinary;

        public CloudinaryService(Cloudinary cloudinary)
        {
            this.cloudinary = cloudinary;
        }

        public async Task<string> UploadAsync(IFormFile file, string name)
        {
            byte[] destinationImage;

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            destinationImage = memoryStream.ToArray();

            using var destinationStream = new MemoryStream(destinationImage);

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(name, destinationStream),
                PublicId = name,
            };

            var result = await this.cloudinary.UploadAsync(uploadParams);

            return result.Url.AbsoluteUri;
        }

        public async Task DeleteImageAsync(Cloudinary cloudinary, string name)
        {
            var delParams = new DelResParams()
            {
                PublicIds = new List<string>() { name },
                Invalidate = true,
            };

            await cloudinary.DeleteResourcesAsync(delParams);
        }
    }
}
