using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IChapterRepository
    {
        void Delete(int id, int storyId);
        void Edit(Chapter chapter);
        List<Chapter> GetFromStory(int storyId);
        void Add(Chapter chapter);
        Chapter GetOneFromStory(int storyId, int placeInOrder);
    }
}