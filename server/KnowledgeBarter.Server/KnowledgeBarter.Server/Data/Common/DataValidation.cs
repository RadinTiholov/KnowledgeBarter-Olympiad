namespace KnowledgeBarter.Server.Data.Common
{
    public static class DataValidation
    {
        public class Lesson
        {
            public const int TitleMaxLength = 20;
            public const int TitleMinLength = 3;

            public const int DescriptionMaxLength = 60;
            public const int DescriptionMinLength = 10;

            public const int ArticleMaxLength = 4000;
            public const int ArticleMinLength = 50;
        }
        public class Course
        {
            public const int TitleMaxLength = 30;
            public const int TitleMinLength = 3;

            public const int DescriptionMaxLength = 60;
            public const int DescriptionMinLength = 10;
        }

        public class Tag
        {
            public const int TagMaxLength = 100;
            public const int TagMinLength = 1;
        }

        public class Comment
        {
            public const int TextMaxLength = 200;
            public const int TextMinLength = 10;
        }

        public class Email
        {
            public const int EmailMinLength = 30;
            public const int EmailMaxLength = 1000;
            public const int TopicMinLength = 3;
            public const int TopicMaxLength = 20;
        }

        public class Message
        {
            public const int TextMaxLength = 200;
            public const int TextMinLength = 2;
        }

        public class User
        {
            public const int UserNameMaxLength = 200;
            public const int UserNameMinLength = 1;
        }
    }
}
