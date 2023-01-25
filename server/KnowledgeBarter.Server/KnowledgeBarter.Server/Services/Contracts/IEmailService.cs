using KnowledgeBarter.Server.Models.Email;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface IEmailService
    {
        Task SendEmailAsync(SendEmailRequestModel model);
    }
}
