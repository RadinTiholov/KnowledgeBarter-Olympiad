using KnowledgeBarter.Server.Infrastructure.Extensions;
using KnowledgeBarter.Server.Models.Message;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using static KnowledgeBarter.Server.Infrastructure.WebConstants;

namespace KnowledgeBarter.Server.Controllers
{
    [Authorize]
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
        [Route(MessageCreateRoute)]
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
        [Route(MessageAllRoute)]
        public async Task<ActionResult<IEnumerable<MessageInListViewModel>>> All(string receiverUsername)
        {
            var receiverId = await this.identityService.GetIdByUsernameAsync(receiverUsername);
            if (!this.ModelState.IsValid || receiverId == null)
            {
                return this.BadRequest();
            }

            var receiver = await this.identityService.GetUserAsync(receiverId);
            var sender = await this.identityService.GetUserAsync(this.User.Id());

            var messages = await this.messageService.GetAllForUsersAsync(sender.UserName, receiver.UserName);

            return messages;
        }
    }
}
