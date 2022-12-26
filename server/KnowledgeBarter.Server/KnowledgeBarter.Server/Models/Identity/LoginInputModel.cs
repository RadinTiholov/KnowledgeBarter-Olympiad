using System.ComponentModel.DataAnnotations;

namespace KnowledgeBarter.Server.Models.Identity
{
    public class LoginInputModel
    {

        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
