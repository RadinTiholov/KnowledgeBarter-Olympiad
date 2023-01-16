namespace KnowledgeBarter.Server.Infrastructure.Attributes
{
    using System.ComponentModel.DataAnnotations;

    public class AllowedFileExtensionsAttribute : ValidationAttribute
    {
        private readonly string[] extensions = WebConstants.AllowedImageExtensions;

        protected override ValidationResult IsValid(
        object value, ValidationContext validationContext)
        {
            if (value is IFormFile file)
            {
                var extension = Path.GetExtension(file.FileName);

                if (!this.extensions.Contains(extension.ToLower()))
                {
                    return new ValidationResult(this.GetErrorMessage());
                }
            }

            return ValidationResult.Success;
        }

        private string GetErrorMessage()
        {
            return WebConstants.AllowedExtensionsErrorMessage;
        }
    }
}
