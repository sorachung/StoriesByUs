using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IBookmarkRepository
    {
        List<Bookmark> GetByUser(int userId);
        void Delete(int id);
        void Edit(Bookmark bookmark);
        Bookmark GetByStoryAndUser(int storyId, int userId);
        void Add(Bookmark bookmark);
    }
}