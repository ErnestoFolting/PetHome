using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface ITimeExceptionRepository
    {
        Task Add(TimeException timeExceptionToAdd);

        Task Delete(TimeException timeExceptionToDelete);
        Task<List<TimeException>> GetBySpecification(Specification<TimeException> spec);
    }
}
