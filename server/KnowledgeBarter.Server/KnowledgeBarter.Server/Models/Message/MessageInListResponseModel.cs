namespace KnowledgeBarter.Server.Models.Message
{
    using AutoMapper;
    using KnowledgeBarter.Server.Services.Mapping;
    using KnowledgeBarter.Server.Data.Models;
    using KnowledgeBarter.Server.Models.Message.Base;

    using static KnowledgeBarter.Server.Infrastructure.WebConstants;

    public class MessageInListViewModel : BaseMessageModel, IMapFrom<Message>, IHaveCustomMappings
    {
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
                    opt.MapFrom(r => r.Receiver.Image.Url))
                .ForMember(x => x.Date, opt =>
                    opt.MapFrom(r => r.CreatedOn.ToString(DateFormat)));
        }
    }
}
