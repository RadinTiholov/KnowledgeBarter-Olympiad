using KnowledgeBarter.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace KnowledgeBarter.Server.Infrastructure.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static void ApplyMigration(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<KnowledgeBarterDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
