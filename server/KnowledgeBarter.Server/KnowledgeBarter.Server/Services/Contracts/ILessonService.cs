﻿using KnowledgeBarter.Server.Models.Lesson;

namespace KnowledgeBarter.Server.Services.Contracts
{
    public interface ILessonService
    {
        Task<IEnumerable<LessonInListResponseModel>> AllAsync();

        Task<IEnumerable<LessonInListResponseModel>> PopularAsync();

        Task<LessonDetailsResponseModel> GetOneAsync(int id);

        Task<CreateLessonResponseModel> CreateAsync(CreateLesssonRequestModel model, string userId);

        Task<EditLessonResponseModel> EditAsync(EditLessonRequestModel model, int lessonId, string userId);

        Task DeleteAsync(int id, string userId);

        Task LikeAsync(int id, string userId);
    }
}
