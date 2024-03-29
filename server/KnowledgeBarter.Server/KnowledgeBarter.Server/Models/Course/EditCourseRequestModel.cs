﻿using KnowledgeBarter.Server.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;
using static KnowledgeBarter.Server.Data.Common.DataValidation.Course;

namespace KnowledgeBarter.Server.Models.Course
{
    public class EditCourseRequestModel
    {
        [Required]
        [StringLength(DescriptionMaxLength, MinimumLength = TitleMinLength)]
        public string Title { get; set; } = null!;

        [Required]
        [StringLength(DescriptionMaxLength, MinimumLength = DescriptionMinLength)]
        public string Description { get; set; } = null!;

        [AllowedFileExtensions]
        public IFormFile? Image { get; set; }

        [Required]
        [MinLength(5)]
        public int[] Lessons { get; set; } = null!;
    }
}
