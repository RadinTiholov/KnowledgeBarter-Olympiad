using KnowledgeBarter.Server.Data.Common.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

using static KnowledgeBarter.Server.Data.Common.DataValidation.Message;

namespace KnowledgeBarter.Server.Data.Models
{
    public class Message : BaseModel<int>
    {
        [Required]
        [MaxLength(TextMaxLength)]
        public string Text { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Sender))]
        public string SenderId { get; set; } = null!;

        public ApplicationUser Sender { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Receiver))]
        public string ReceiverId { get; set; } = null!;

        public ApplicationUser Receiver { get; set; } = null!;
    }
}
