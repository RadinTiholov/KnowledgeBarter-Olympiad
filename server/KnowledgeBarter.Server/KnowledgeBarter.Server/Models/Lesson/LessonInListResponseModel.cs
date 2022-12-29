namespace KnowledgeBarter.Server.Models.Lesson
{
    public class LessonInListResponseModel
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Article { get; set; } = null!;
    }
}
