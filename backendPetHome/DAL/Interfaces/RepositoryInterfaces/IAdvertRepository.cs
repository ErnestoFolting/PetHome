using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IAdvertRepository
    {
        public Task<Advert?> GetById(int id);
    }
}
