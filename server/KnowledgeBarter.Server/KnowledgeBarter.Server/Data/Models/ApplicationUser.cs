using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KnowledgeBarter.Server.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            OwnLessons = new HashSet<Lesson>();
            OwnCourses = new HashSet<Course>();
        }

        public int KBPoints { get; set; } = 0;

        [Required]
        [ForeignKey(nameof(Image))]
        public int ImageId { get; set; }

        public Image Image { get; set; } = null!;

        public virtual ICollection<Lesson> OwnLessons { get; set; }
        public virtual ICollection<Course> OwnCourses { get; set; }
    }
}
