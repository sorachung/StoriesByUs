using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IStoryRepository
    {
        List<Story> GetAll();
    }
}