using StoriesByUs.Models;

namespace StoriesByUs.Repositories
{
    public interface IUserRepository
    {
        void Deactivate(int id);
        void EditBio(User user);
        User GetbyId(int id);
        User GetByFirebaseUserId(string firebaseUserId);
        void Add(User user);
    }
}