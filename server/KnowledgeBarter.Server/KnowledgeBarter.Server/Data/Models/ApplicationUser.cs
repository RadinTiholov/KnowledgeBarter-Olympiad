using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KnowledgeBarter.Server.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.OwnLessons = new HashSet<Lesson>();
            this.OwnCourses = new HashSet<Course>();
            this.LikedLessons = new HashSet<Lesson>();
            this.LikedCourses = new HashSet<Course>();
            this.BoughtLessons = new HashSet<Lesson>();
            this.BoughtCourses = new HashSet<Course>();
        }

        public int KBPoints { get; set; } = 0;

        [Required]
        [ForeignKey(nameof(Image))]
        public int ImageId { get; set; }

        public Image Image { get; set; } = null!;

        [InverseProperty("Owner")]
        public virtual ICollection<Lesson> OwnLessons { get; set; }

        [InverseProperty("Owner")]
        public virtual ICollection<Course> OwnCourses { get; set; }

        [InverseProperty("UsersWhoLiked")]
        public virtual ICollection<Lesson> LikedLessons { get; set; }

        [InverseProperty("UsersWhoLiked")]
        public virtual ICollection<Course> LikedCourses { get; set; }

        [InverseProperty("UsersWhoBought")]
        public virtual ICollection<Lesson> BoughtLessons { get; set; }

        [InverseProperty("UsersWhoBought")]
        public virtual ICollection<Course> BoughtCourses { get; set; }
    }
}
