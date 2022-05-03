using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IChapterRepository
    {
        List<Chapter> GetAllFromStory(int storyId);
        Chapter GetWithStory(int chapterId, int storyId);
    }
}