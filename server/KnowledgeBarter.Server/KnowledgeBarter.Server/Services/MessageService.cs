using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Message;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBarter.Server.Services
{
    public class MessageService : IMessageService
    {
        private readonly IIdentityService identityService;
        private readonly IRepository<Message> messageRepository;

        public MessageService(IIdentityService identityService)
        {
            this.identityService = identityService;
        }

        public async Task CreateAsync(CreateMessageRequestModel model, string senderId)
        {
            var receiverId = await this.identityService.GetIdByUsernameAsync(model.ReceiverUsername);

            var message = new Message()
            {
                Text = model.Text,
                ReceiverId = receiverId,
                SenderId = senderId,
            };

            await this.messageRepository.AddAsync(message);
            await this.messageRepository.SaveChangesAsync();
        }

        public async Task<List<MessageInListViewModel>> GetAllForUsersAsync(string senderUsername, string receiverUsername)
        {
            return await this.messageRepository
                .AllAsNoTracking()
                .Include(x => x.Sender)
                .Include(x => x.Receiver)
                .Where(x => (x.Sender.UserName == senderUsername
                    && x.Receiver.UserName == receiverUsername)
                    || (x.Sender.UserName == receiverUsername
                    && x.Receiver.UserName == senderUsername))
                .OrderBy(x => x.CreatedOn)
                .To<MessageInListViewModel>()
                .ToListAsync();
        }
    }
}
