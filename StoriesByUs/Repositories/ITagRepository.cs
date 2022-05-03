using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface ITagRepository
    {
        Tag Get(int id);
        List<Tag> GetAll();
        List<Tag> GetAllWithStoryCountOverZero();
    }
}