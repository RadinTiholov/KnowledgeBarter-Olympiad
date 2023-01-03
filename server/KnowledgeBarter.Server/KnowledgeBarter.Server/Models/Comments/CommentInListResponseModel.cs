namespace KnowledgeBarter.Server.Models.Comments
{
    public class CommentInListResponseModel
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public string Owner { get; set; } = null!;

        public int Lesson { get; set; }
    }
}
