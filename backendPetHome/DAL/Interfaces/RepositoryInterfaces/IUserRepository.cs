using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdSpecification(Specification<User> spec);
        Task Update(User entity);
        Task Delete(User useToDelete);
    }
}
