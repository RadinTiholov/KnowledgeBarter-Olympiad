using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace KnowledgeBarter.Server.Infrastructure.Attributes
{
    public class HtmlTextLengthAttribute : ValidationAttribute
    {
        private readonly int minLength;
        private readonly int maxLength;

        public HtmlTextLengthAttribute(int minLength, int maxLength)
        {
            this.minLength = minLength;
            this.maxLength = maxLength;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var html = value.ToString();
            var text = Regex.Replace(html, "<.*?>", string.Empty); // Extract text from HTML

            if (text.Length < minLength)
            {
                return new ValidationResult($"The field {validationContext.DisplayName} must be at least {minLength} characters long.");
            }

            if (text.Length > maxLength)
            {
                return new ValidationResult($"The field {validationContext.DisplayName} cannot exceed {maxLength} characters in length.");
            }

            return ValidationResult.Success;
        }
    }
}
