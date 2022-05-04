using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IChapterRepository
    {
        Chapter GetOneFromStory(int storyId, int placeInOrder);
    }
}