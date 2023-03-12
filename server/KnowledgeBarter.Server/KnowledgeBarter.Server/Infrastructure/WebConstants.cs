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

        public const string DeleteCommentRoute = "/Comment/Delete/{id}";

        public const string IdentityProfileRoute = "/Identity/Profile/{userId}";

        public const string UserInformationRoute = "/Identity/UserInformation/{userId}";

        public const string AllProfilesRoute = "/Identity/AllProfiles";

        public const string MessageCreateRoute = "/Message/Create";

        public const string MessageAllRoute = "/Message/All/{receiverUsername}";

        public const string AllowedExtensionsErrorMessage = "This file extension is not allowed.";

        public const string SomethingWentWrongMessage = "Something went wrong. Please try again later.";

        public const string SuccessfullyDeleted = "Successfully deleted.";

        public const string SuccessfullyLiked = "Successfully liked.";

        public const string SuccessfullyBuied = "Successfully buied.";

        public const string AdministratorRoleName = "administrator";

        public static readonly string[] AllowedImageExtensions = { ".jpg", ".jpeg", ".png" };
    }
}
