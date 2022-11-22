using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.Services
{
    public class RequestService
    {
        private readonly DataContext _context;
        public RequestService(DataContext context)
        {
            _context = context;
        }
        public Task addRequest(string userId, int advertId)
        {
            Advert? advertInDb = _context.adverts.Find(advertId);
            if (advertInDb == null) throw new ArgumentException("The advert does not exist");
            if (advertInDb.ownerId == userId) throw new ArgumentException("You can not send a request on your own advert.");
            Request newRequest = new(); 
            newRequest.userId = userId;
            newRequest.advertId = advertId;
            newRequest.status = DAL.Enums.RequestStatusEnum.applied;
            _context.requests.Add(newRequest);
            return _context.SaveChangesAsync();
        }
    }
}
