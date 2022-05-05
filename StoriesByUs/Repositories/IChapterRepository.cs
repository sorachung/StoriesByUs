using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IChapterRepository
    {
        void Add(Chapter chapter);
        Chapter GetOneFromStory(int storyId, int placeInOrder);
    }
}