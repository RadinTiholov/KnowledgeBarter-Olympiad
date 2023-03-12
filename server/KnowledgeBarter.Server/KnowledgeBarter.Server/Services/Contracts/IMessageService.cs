using KnowledgeBarter.Server.Models.Message;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface IMessageService
    {
        Task<CreateMessageResponseModel> CreateAsync(CreateMessageRequestModel model, string senderId);

        Task<List<MessageInListViewModel>> GetAllForUsersAsync(string senderUsername, string receiverUsername);

        Task<List<string>> GetDistinctContactsAsync(string username);
    }
}
