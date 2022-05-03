using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IGenreRepository
    {
        Genre Get(int id);
        List<Genre> GetAllWithStoryCountOverZero();
        List<Genre> GetAll();
    }
}