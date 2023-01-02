namespace KnowledgeBarter.Server.Models.Lesson
{
    using AutoMapper;
    using KnowledgeBarter.Server.Services.Mapping;
    using KnowledgeBarter.Server.Data.Models;

    public class LessonDetailsResponseModel : IMapFrom<Lesson>
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
    }
}
