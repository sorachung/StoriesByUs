using StoriesByUs.Models;

namespace StoriesByUs.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseUserId(string firebaseUserId);
    }
}