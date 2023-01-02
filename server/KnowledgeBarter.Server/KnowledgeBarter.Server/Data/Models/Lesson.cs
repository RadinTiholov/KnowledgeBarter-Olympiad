namespace KnowledgeBarter.Server.Data.Models
{
    using KnowledgeBarter.Server.Data.Common.Models;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using static KnowledgeBarter.Server.Data.Common.DataValidation.Lesson;

    public class Lesson : BaseDeletableModel<int>
    {
        public Lesson()
        {
            this.Likes = new HashSet<Like>();
            this.Tags = new HashSet<Tag>();
            this.Comments = new HashSet<Comment>();
            this.Courses = new HashSet<Course>();
            this.UsersWhoBought = new HashSet<ApplicationUser>();
            this.UsersWhoLiked = new HashSet<ApplicationUser>();
        }
        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        [MaxLength(ArticleMaxLength)]
        public string Article { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Owner))]
        public string OwnerId { get; set; } = null!;

        public ApplicationUser Owner { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Image))]
        public int ImageId { get; set; }

        public Image Image { get; set; } = null!;

        [Required]
        [Url]
        public string Video { get; set; } = null!;

        [Required]
        public int Views { get; set; }

        [Required]
        public int Price { get; set; }

        public string? Resources { get; set; }

        public virtual ICollection<Like> Likes { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual ICollection<Course> Courses { get; set; }

        public virtual ICollection<ApplicationUser> UsersWhoBought { get; set; }

        public virtual ICollection<ApplicationUser> UsersWhoLiked { get; set; }
    }
}
