using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Models.Message;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;

using static KnowledgeBarter.Server.Services.ServiceConstants;

namespace KnowledgeBarter.Server.Services
{
    public class MessageService : IMessageService
    {
        private readonly IIdentityService identityService;
        private readonly IRepository<Message> messageRepository;

        public MessageService(IIdentityService identityService, IRepository<Message> messageRepository)
        {
            this.identityService = identityService;
            this.messageRepository = messageRepository;
        }

        public async Task<CreateMessageResponseModel> CreateAsync(CreateMessageRequestModel model, string senderId)
        {
            var receiverId = await this.identityService.GetIdByUsernameAsync(model.ReceiverUsername);

            if (receiverId == null)
            {
                throw new ArgumentException(MessageReceiverNotFound);
            }

            var message = new Message()
            {
                Text = model.Text,
                ReceiverId = receiverId,
                SenderId = senderId,
            };

            await this.messageRepository.AddAsync(message);
            await this.messageRepository.SaveChangesAsync();

            return await this.messageRepository
                .AllAsNoTracking()
                .Where(x => x.Id == message.Id)
                .To<CreateMessageResponseModel>()
                .FirstAsync();
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

        public async Task<List<string>> GetDistinctContactsAsync(string username)
        {
            var receivers = await this.messageRepository
                .AllAsNoTracking()
                .Include(x => x.Sender)
                .Include(x => x.Receiver)
                .Where(x => x.Sender.UserName == username)
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => x.ReceiverId)
                .Distinct()
                .ToListAsync();

            var senders = await this.messageRepository
                .AllAsNoTracking()
                .Include(x => x.Sender)
                .Include(x => x.Receiver)
                .Where(x => x.Receiver.UserName == username)
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => x.SenderId)
                .Distinct()
                .ToListAsync();

            return receivers.Concat(senders).Distinct().ToList();
        }
    }
}
