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
        [Url]
        public string Image { get; set; } = null!;

        [Required]
        [MinLength(3)]
        public string[] Lessons { get; set; }
    }
}
