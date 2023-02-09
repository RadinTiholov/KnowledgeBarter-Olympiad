using KnowledgeBarter.Server.Infrastructure.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using static KnowledgeBarter.Server.Data.Common.DataValidation.Lesson;

namespace KnowledgeBarter.Server.Models.Lesson
{
    public class CreateLessonRequestModel
    {
        [Required]
        [StringLength(TitleMaxLength, MinimumLength = TitleMinLength)]
        public string Title { get; set; } = null!;

        [Required]
        [StringLength(DescriptionMaxLength, MinimumLength = DescriptionMinLength)]
        public string Description { get; set; } = null!;

        [Required]
        [StringLength(ArticleMaxLength, MinimumLength = ArticleMinLength)]
        public string Article { get; set; } = null!;

        [Required]
        [AllowedFileExtensions]
        public IFormFile Image { get; set; }

        [Required]
        [Url]
        public string Video { get; set; } = null!;

        [Url]
        public string? Resources { get; set; } = null;

        [Required]
        [MinLength(1)]
        public string[] Tags { get; set; } = null!;
    }
}
