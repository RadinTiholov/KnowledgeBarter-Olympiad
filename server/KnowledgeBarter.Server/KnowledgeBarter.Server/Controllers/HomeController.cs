namespace KnowledgeBarter.Server.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Diagnostics;

    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        //[Authorize]
        public async Task<IActionResult> Get()
        {
            return this.Ok("Works");
        }
    }
}