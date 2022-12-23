using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IRequestRepository
    {
        Task Add(Request requestToAdd);
        Task Delete(Request requestToRemove);
        Task<Request?> GetByIdSpecification(Specification<Request> spec);
        Task<List<Request>> GetBySpecification(Specification<Request> spec);
    }
}
