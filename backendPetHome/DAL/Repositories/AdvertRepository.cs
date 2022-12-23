using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;

namespace backendPetHome.DAL.Repositories
{
    public class AdvertRepository :IAdvertRepository
    {
        private readonly DataContext _context;
        public AdvertRepository(DataContext context)
        {
            _context = context;
        }

        public Task<Advert?> GetById(int id)
        {
            return _context.Set<Advert>().FindAsync(id).AsTask();
        }
    }
}
