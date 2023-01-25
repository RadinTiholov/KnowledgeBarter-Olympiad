using KnowledgeBarter.Server.Models.Email;
using KnowledgeBarter.Server.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using static KnowledgeBarter.Server.Infrastructure.WebConstants;

namespace KnowledgeBarter.Server.Controllers
{
    [Authorize]
    public class EmailController : ApiController
    {
        private readonly IEmailService emailService;

        public EmailController(IEmailService emailService)
        {
            this.emailService = emailService;
        }

        [HttpPost]
        [Route(nameof(Send))]
        public async Task<IActionResult> Send(SendEmailRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(SomethingWentWrongMessage);
            }

            try
            {
                await this.emailService.SendEmailAsync(model);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest(SomethingWentWrongMessage);
            }
        }
    }
}
