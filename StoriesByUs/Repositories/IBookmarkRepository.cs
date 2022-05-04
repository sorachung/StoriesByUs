using StoriesByUs.Models;

namespace StoriesByUs.Repositories
{
    public interface IBookmarkRepository
    {
        void Edit(Bookmark bookmark);
        Bookmark GetByStoryAndUser(int storyId, int userId);
        void Add(Bookmark bookmark);
    }
}