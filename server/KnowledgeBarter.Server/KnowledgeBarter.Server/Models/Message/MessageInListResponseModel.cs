namespace KnowledgeBarter.Server.Models.Message
{
    using AutoMapper;
    using KnowledgeBarter.Server.Services.Mapping;
    using KnowledgeBarter.Server.Data.Models;

    public class MessageInListViewModel : IMapFrom<Message>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public string SenderUsername { get; set; } = null!;

        public string SenderImage { get; set; } = null!;

        public string ReceiverUsername { get; set; } = null!;

        public string ReceiverImage { get; set; } = null!;

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Message, MessageInListViewModel>()
                .ForMember(x => x.SenderUsername, opt =>
                    opt.MapFrom(s => s.Sender.UserName))
                .ForMember(x => x.SenderImage, opt =>
                    opt.MapFrom(s => s.Sender.Image.Url))
                .ForMember(x => x.ReceiverUsername, opt =>
                    opt.MapFrom(r => r.Receiver.UserName))
                .ForMember(x => x.ReceiverImage, opt =>
                    opt.MapFrom(r => r.Receiver.Image.Url));
        }
    }
}
