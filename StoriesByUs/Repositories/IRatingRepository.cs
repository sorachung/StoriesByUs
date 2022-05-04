using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IRatingRepository
    {
        List<Rating> GetAll();
    }
}