using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class UserDataService
    {
        private readonly DataContext _context;
        public UserDataService(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<Advert> getCurrentUserAdverts(string userId)
        {
            return _context.adverts.Include(advert => advert.requests).Where(a => a.ownerId == userId);
        }
        public async Task<Advert?> getCurrentUserCertainAdvert(int advertId)
        {
            Advert? advertInDb = await _context.adverts.Include(advert => advert.requests).ThenInclude(request=>request.user).FirstOrDefaultAsync(el => el.Id == advertId);
            return advertInDb;
        }
        public async Task<User> getCurrentUserProfile(string id)
        {
            var user = await _context.users.Include(u => u.timeExceptions).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
        public IEnumerable<Request> getCurrentUserRequests(string id)
        {
            var user = _context.requests.Include(r => r.advert).Where(el => el.userId == id);
            return user;
        }
    }
}
