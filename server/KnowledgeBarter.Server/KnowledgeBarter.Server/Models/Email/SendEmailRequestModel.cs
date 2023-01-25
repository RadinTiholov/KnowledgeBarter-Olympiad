using System.ComponentModel.DataAnnotations;

using static KnowledgeBarter.Server.Data.Common.DataValidation.Email;

namespace KnowledgeBarter.Server.Models.Email
{
    public class SendEmailRequestModel
    {
        [Required]
        [EmailAddress]
        public string SenderEmail { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string OwnerEmail { get; set; } = null!;

        [Required]
        [StringLength(TopicMaxLength, MinimumLength = TopicMinLength)]
        public string Topic { get; set; } = null!;

        [Required]
        [StringLength(EmailMaxLength, MinimumLength = EmailMinLength)]
        public string EmailText { get; set; } = null!;
    }
}
