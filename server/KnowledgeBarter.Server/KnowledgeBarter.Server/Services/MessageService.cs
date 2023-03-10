using KnowledgeBarter.Server.Models.Message;
using KnowledgeBarter.Server.Services.Contracts;

namespace KnowledgeBarter.Server.Services
{
    public class MessageService : IMessageService
    {
        public Task CreateAsync(CreateMessageRequestModel model, string senderId)
        {
            throw new NotImplementedException();
        }

        public Task<List<MessageInListViewModel>> GetAllForUsersAsync(string senderUsername, string receiverUsername)
        {
            throw new NotImplementedException();
        }
    }
}
