using backendPetHome.DAL.Data;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;

namespace backendPetHome.DAL.Repositories
{
    public class TimeExceptionRepository: ITimeExceptionRepository
    {
        private readonly DataContext _context;
        public TimeExceptionRepository(DataContext context)
        {
            _context = context;
        }
    }
}
