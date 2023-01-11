using System.ComponentModel.DataAnnotations;
using static KnowledgeBarter.Server.Data.Common.DataValidation.Course;

namespace KnowledgeBarter.Server.Models.Course
{
    public class EditCourseRequestModel
    {
        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        [Url]
        public string Image { get; set; } = null!;

        [Required]
        [MinLength(5)]
        public int[] Lessons { get; set; } = null!;
    }
}
