using StoriesByUs.Models;

namespace StoriesByUs.Repositories
{
    public interface IUserRepository
    {
        User GetbyId(int id);
        User GetByFirebaseUserId(string firebaseUserId);
        void Add(User user);
    }
}