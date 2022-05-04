using StoriesByUs.Models;

namespace StoriesByUs.Repositories
{
    public interface IBookmarkRepository
    {
        Bookmark GetByStoryAndUser(int storyId, int userId);
        void Add(Bookmark bookmark);
    }
}