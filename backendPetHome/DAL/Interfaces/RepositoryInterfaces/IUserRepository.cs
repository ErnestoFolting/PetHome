using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdIncludesTimeException(string id);
        Task Delete(User useToDelete);
        Task Update(User entity);
        Task<User?> GetById(string id);
    }
}
