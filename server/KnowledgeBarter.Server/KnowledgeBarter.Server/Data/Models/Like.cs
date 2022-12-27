using KnowledgeBarter.Server.Data.Common.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KnowledgeBarter.Server.Data.Models
{
    public class Like : BaseModel<int>
    {
        [Required]
        [ForeignKey(nameof(Owner))]
        public string OwnerId { get; set; } = null!;

        public ApplicationUser Owner { get; set; } = null!;

        [ForeignKey(nameof(Lesson))]
        public int? LessonId { get; set; }

        public Lesson? Lesson { get; set; }

        [ForeignKey(nameof(Course))]
        public int? CourseId { get; set; }

        public Course? Course { get; set; }
    }
}
