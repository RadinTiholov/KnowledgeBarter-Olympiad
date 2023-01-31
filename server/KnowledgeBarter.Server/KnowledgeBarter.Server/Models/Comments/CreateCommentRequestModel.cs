using System.ComponentModel.DataAnnotations;

using static KnowledgeBarter.Server.Data.Common.DataValidation.Comment;

namespace KnowledgeBarter.Server.Models.Comments
{
    public class CreateCommentRequestModel
    {
        [Required]
        [StringLength(TextMaxLength, MinimumLength = TextMinLength)]
        public string Text { get; set; } = null!;
    }
}
