using KnowledgeBarter.Server.Data.Common.Models;
using System.ComponentModel.DataAnnotations;

namespace KnowledgeBarter.Server.Data.Models
{
    public class Image : BaseModel<int>
    {
        [Required]
        [Url]
        public string Url { get; set; } = null!;
    }
}
