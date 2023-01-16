using KnowledgeBarter.Server.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

using static KnowledgeBarter.Server.Data.Common.DataValidation.Course;


namespace KnowledgeBarter.Server.Models.Course
{
    public class CreateCourseRequestModel
    {
        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        [AllowedFileExtensions]
        public IFormFile Image { get; set; }

        [Required]
        [MinLength(5)]
        public int[] Lessons { get; set; } = null!;
    }
}
