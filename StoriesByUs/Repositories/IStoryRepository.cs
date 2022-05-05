using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IStoryRepository
    {
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