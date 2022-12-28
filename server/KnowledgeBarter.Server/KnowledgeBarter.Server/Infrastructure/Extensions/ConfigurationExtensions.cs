namespace KnowledgeBarter.Server.Infrastructure.Extensions
{
    public static class ConfigurationExtensions
    {
        public static ApplicationSettings GetApplicationSettings(this IServiceCollection services, IConfiguration configuration)
        {
            var applicationSettingsConfiguration = configuration.GetSection("ApplicationSettings");
            services.Configure<ApplicationSettings>(applicationSettingsConfiguration);
            var appSettings = applicationSettingsConfiguration.Get<ApplicationSettings>();

            return appSettings;
        }
    }
}
