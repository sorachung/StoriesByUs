using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IStoryRepository
    {
        List<Story> GetByTag(int id);
        List<Story> GetByGenre(int genreId);
        List<Story> GetAll();
    }
}