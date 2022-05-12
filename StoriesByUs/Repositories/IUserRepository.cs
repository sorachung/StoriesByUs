using StoriesByUs.Models;
using System.Collections.Generic;

namespace StoriesByUs.Repositories
{
    public interface IUserRepository
    {
        List<User> GetDeactivatedUsers();
        void Reactivate(int id);
        void Deactivate(int id);
        void EditBio(User user);
        User GetbyId(int id);
        User GetByFirebaseUserId(string firebaseUserId);
        void Add(User user);
    }
}