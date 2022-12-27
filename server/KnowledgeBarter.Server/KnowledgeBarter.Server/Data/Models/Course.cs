using KnowledgeBarter.Server.Data.Common.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static KnowledgeBarter.Server.Data.Common.DataValidation.Course;

namespace KnowledgeBarter.Server.Data.Models
{
    public class Course : BaseDeletableModel<int>
    {
        public Course()
        {
            this.Lessons = new HashSet<Lesson>();
            this.Likes = new HashSet<Like>();
        }

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Owner))]
        public string OwnerId { get; set; } = null!;

        public ApplicationUser Owner { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Image))]
        public int ImageId { get; set; }

        public Image Image { get; set; } = null!;

        [Required]
        public int Price { get; set; }

        public virtual ICollection<Lesson> Lessons { get; set; }

        public virtual ICollection<Like> Likes { get; set; }
    }
}
