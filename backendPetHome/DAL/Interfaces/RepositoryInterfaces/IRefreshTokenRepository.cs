using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken?> GetByToken(string? token);
        Task Add(RefreshToken tokenToAdd);
        Task Update(RefreshToken tokenToUpdate);
    }
}
