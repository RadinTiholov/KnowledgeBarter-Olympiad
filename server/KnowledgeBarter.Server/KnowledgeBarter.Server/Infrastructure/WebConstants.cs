using System.Reflection.Metadata;

namespace KnowledgeBarter.Server.Infrastructure
{
    public class WebConstants
    {
        public const string IdRoute = "{id}";

        public const string LikeLessonRoute = "/Lesson/Like/{id}";

        public const string BuyLessonRoute = "/Lesson/Buy/{id}";

        public const string LikeCourseRoute = "/Course/Like/{id}";

        public const string BuyCourseRoute = "/Course/Buy/{id}";

        public const string CreateCommentRoute = "/Comment/Create/{lessonId}";

        public const string IdentityProfileRoute = "/Identity/Profile/{userId}";

        public const string AllowedExtensionsErrorMessage = "This file extension is not allowed.";

        public const string SomethingWentWrongMessage = "Something went wrong. Please try again later.";

        public static readonly string[] AllowedImageExtensions = { ".jpg", ".jpeg", ".png" };
    }
}
