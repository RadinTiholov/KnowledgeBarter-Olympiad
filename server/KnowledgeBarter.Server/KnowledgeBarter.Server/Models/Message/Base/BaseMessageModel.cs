namespace KnowledgeBarter.Server.Models.Message.Base
{
    public class BaseMessageModel
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public string SenderUsername { get; set; } = null!;

        public string SenderImage { get; set; } = null!;

        public string ReceiverUsername { get; set; } = null!;

        public string ReceiverImage { get; set; } = null!;
    }
}
