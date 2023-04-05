using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Hubs;
using KnowledgeBarter.Server.Infrastructure.Extensions;
using KnowledgeBarter.Server.Models;
using KnowledgeBarter.Server.Services.Mapping;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

var appSettings = builder.Services.GetApplicationSettings(builder.Configuration);

builder.Services.AddDbContext<KnowledgeBarterDbContext>(options =>
    options.UseSqlServer(connectionString))
    .AddDatabaseDeveloperPageExceptionFilter()
    .AddIdentity()
    .AddJwtAuthentication(appSettings)
    .AddRepositories()
    .AddSendGrid(builder.Configuration)
    .AddSignalRExtn()
    .AddApplicationServices()
    .AddSwagger()
    .AddCloudinary(builder.Configuration)
    .AddControllers();

// Register automapper
AutoMapperConfig.RegisterMappings(typeof(AutoMapperModel).GetTypeInfo().Assembly);

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

app
    .UseSwagger()
    .UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "KnowledgeBarter Api");
        c.RoutePrefix = String.Empty;
    });
app.UseRouting();

app.UseCors(options => options
    .WithOrigins("https://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed((x) => true)
    .AllowCredentials());


app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapHub<ChatHub>("/chatHub");

app.ApplyMigration();

app.Run();
