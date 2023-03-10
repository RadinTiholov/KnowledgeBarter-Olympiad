using KnowledgeBarter.Server.Infrastructure.Extensions;
using KnowledgeBarter.Server.Models.Message;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBarter.Server.Controllers
{
    public class MessageController : ApiController
    {
        private readonly IMessageService messageService;
        private readonly IIdentityService identityService;


        public MessageController(IMessageService messageService, IIdentityService identityService)
        {
            this.identityService = identityService;
            this.messageService = messageService;
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateMessageRequestModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest();
            }

            await this.messageService.CreateAsync(model, this.User.Id());

            return this.Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageInListViewModel>>> All(string receiverUsername)
        {
            if (!this.ModelState.IsValid || await this.identityService.GetIdByUsernameAsync(receiverUsername) == null)
            {
                return this.BadRequest();
            }

            var receiver = await this.identityService.GetUserAsync(receiverUsername);
            var senderUsername = this.User?.Identity?.Name;

            var messages = await this.messageService.GetAllForUsersAsync(senderUsername, receiver.UserName);

            return messages;
        }
    }
}
