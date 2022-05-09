using StoriesByUs.Models;
using System;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IStoryRepository
    {
        List<Story> GetRecent();
        void DeleteStory(int storyId);
        void EditLastUpdatedDateTime(int storyId, DateTime datetime);
        void EditStoryGenres(int storyId, List<int> genreIds);
        void EditStoryTags(int storyId, List<int> tagIds);
        void Edit(Story story);
        List<Story> GetByUser(int id);
        void AddStoryGenres(int storyId, List<int> genreIds);
        void AddStoryTags(int storyId, List<int> tagIds);
        void Add(Story story);
        Story Get(int id);
        List<Story> GetByTag(int id);
        List<Story> GetByGenre(int genreId);
        List<Story> GetAll();
    }
}