using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Infrastructure;
using KnowledgeBarter.Server.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

var appSettings = builder.Services.GetApplicationSettings(builder.Configuration);

builder.Services.AddDbContext<KnowledgeBarterDbContext>(options =>
    options.UseSqlServer(connectionString))
    .AddDatabaseDeveloperPageExceptionFilter()
    .AddIdentity()
    .AddJwtAuthentication(appSettings)
    .AddRepositories()
    .AddApplicationServices()
    .AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");

    app.UseHsts();
}

app.UseRouting();

app.UseCors(options => options
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.ApplyMigration();

app.Run();
