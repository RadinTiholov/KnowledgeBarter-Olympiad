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
    }
}
