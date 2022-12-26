using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBarter.Server.Data
{
    public class KnowledgeBarterDbContext : IdentityDbContext
    {
        public KnowledgeBarterDbContext(DbContextOptions<KnowledgeBarterDbContext> options)
            : base(options)
        {
        }
    }
}