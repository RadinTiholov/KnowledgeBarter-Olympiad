using CloudinaryDotNet;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ICloudinaryService
    {
        Task<string> UploadAsync(IFormFile file, string name);

        Task DeleteImageAsync(Cloudinary cloudinary, string name);
    }
}
