using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IRequestRepository
    {
        Task<Request?> GetByIdIncludesAdvert(int id);
        Task Add(Request requestToAdd);
        Task Delete(Request requestToRemove);
        Task<List<Request>> GetCurrentAdvertNotCurrent(Request requestToConfirm);
        Task<List<Request>> GetCurrentUserRequests(string userId);
    }
}
