using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IGenreRepository
    {
        List<Genre> GetAllWithStoryCountOverZero();
        List<Genre> GetAll();
    }
}