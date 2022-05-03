using StoriesByUs.Models;

namespace StoriesByUs.Repositories
{
    public interface IChapterRepository
    {
        Chapter GetWithStory(int chapterId, int storyId);
    }
}