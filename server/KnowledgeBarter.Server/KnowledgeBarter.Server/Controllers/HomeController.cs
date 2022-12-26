namespace KnowledgeBarter.Server.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : ApiController
    {
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return this.Ok("Works");
        }
    }
}