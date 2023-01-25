using KnowledgeBarter.Server.Models.Email;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services.Messaging;

namespace KnowledgeBarter.Server.Services
{
    public class EmailService : IEmailService
    {
        private readonly IEmailSender emailSender;
        private readonly IConfiguration configuration;

        public EmailService(IEmailSender emailSender, IConfiguration configuration)
        {
            this.emailSender = emailSender;
            this.configuration = configuration;
        }

        public async Task SendEmailAsync(SendEmailRequestModel model)
        {
            string email = model.EmailText + "\n" + "from: " + model.SenderEmail;
            await this.emailSender.SendEmailAsync(this.configuration["SendGrid:Email"], this.configuration["SendGrid:Sender"], model.OwnerEmail, model.Topic, email);
        }
    }
}
