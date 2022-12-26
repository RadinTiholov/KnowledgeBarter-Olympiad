using KnowledgeBarter.Server.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBarter.Server.Data
{
    public class KnowledgeBarterDbContext : IdentityDbContext<ApplicationUser>
    {
        public KnowledgeBarterDbContext(DbContextOptions<KnowledgeBarterDbContext> options)
            : base(options)
        {
        }
    }
}