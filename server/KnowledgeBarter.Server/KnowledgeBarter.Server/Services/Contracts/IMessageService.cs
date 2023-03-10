using KnowledgeBarter.Server.Models.Message;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface IMessageService
    {
        Task CreateAsync(CreateMessageRequestModel model, string senderId);

        Task<List<MessageInListViewModel>> GetAllForUsersAsync(string senderUsername, string receiverUsername);
    }
}
