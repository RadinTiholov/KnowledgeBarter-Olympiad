using System.ComponentModel.DataAnnotations;

using static KnowledgeBarter.Server.Data.Common.DataValidation.Message;
using static KnowledgeBarter.Server.Data.Common.DataValidation.User;

namespace KnowledgeBarter.Server.Models.Message
{
    public class CreateMessageRequestModel
    {
        [Required]
        [StringLength(TextMaxLength, MinimumLength = TextMinLength)]
        public string Text { get; set; }

        [Required]
        [StringLength(UserNameMaxLength, MinimumLength = UserNameMinLength)]
        public string ReceiverUsername { get; set; }
    }
}
