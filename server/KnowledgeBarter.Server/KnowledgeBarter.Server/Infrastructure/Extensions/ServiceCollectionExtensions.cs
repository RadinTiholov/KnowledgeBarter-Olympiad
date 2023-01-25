using KnowledgeBarter.Server.Data;
using KnowledgeBarter.Server.Data.Common.Repositories;
using KnowledgeBarter.Server.Data.Models;
using KnowledgeBarter.Server.Data.Repositories;
using KnowledgeBarter.Server.Services.Contracts;
using KnowledgeBarter.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using CloudinaryDotNet;
using KnowledgeBarter.Server.Services.Messaging;

namespace KnowledgeBarter.Server.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
            .AddEntityFrameworkStores<KnowledgeBarterDbContext>();

            return services;
        }
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.
                AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.
                AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddTransient<IImageService, ImageService>();
            services.AddTransient<ILessonService, LessonService>();
            services.AddTransient<ITagService, TagService>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<ILikeService, LikeService>();
            services.AddTransient<ICourseService, CourseService>();
            services.AddTransient<ICloudinaryService, CloudinaryService>();
            services.AddTransient<IEmailService, EmailService>();

            return services;
        }

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo() { Title = "KnowledgeBarter Api", Version = "v1" });
            });

            return services;
        }

        public static IServiceCollection AddSendGrid(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IEmailSender>(x => new SendGridEmailSender(configuration["SendGrid:ApiKey"]));

            return services;
        }

        public static IServiceCollection AddCloudinary(this IServiceCollection services, IConfiguration configuration)
        {
            Account account = new Account(
                            configuration["Cloudinary:AppName"],
                            configuration["Cloudinary:AppKey"],
                            configuration["Cloudinary:AppSecret"]);

            Cloudinary cloudinary = new Cloudinary(account);

            services.AddSingleton(cloudinary);

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(
            this IServiceCollection services,
            ApplicationSettings applicationSettings)
        {
            var key = Encoding.ASCII.GetBytes(applicationSettings.Secret);

            services.
                AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });

            return services;
        }
    }
}
