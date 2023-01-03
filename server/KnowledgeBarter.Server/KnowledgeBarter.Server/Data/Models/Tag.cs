using KnowledgeBarter.Server.Data.Common.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

using static KnowledgeBarter.Server.Data.Common.DataValidation.Tag;

namespace KnowledgeBarter.Server.Data.Models
{
    public class Tag : BaseModel<int>
    {
        [Required]
        [ForeignKey(nameof(Lesson))]
        public int LessonId { get; set; }

        public Lesson Lesson { get; set; } = null!;

        [Required]
        [MaxLength(TagMaxLength)]
        public string Text { get; set; } = null!;
    }
}
