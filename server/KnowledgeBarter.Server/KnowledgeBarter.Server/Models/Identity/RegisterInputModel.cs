using KnowledgeBarter.Server.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

namespace KnowledgeBarter.Server.Models.Identity
{
    public class RegisterInputModel
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string Email { get; set; } = null!;

        [Required]
        [AllowedFileExtensions]
        public IFormFile Image { get; set; }

        [Required]
        public string Password { get; set; } = null!;
    }
}
