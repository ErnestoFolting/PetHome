using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;
using Microsoft.EntityFrameworkCore;

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
        public async Task confirmRequest(int requestId, string userId)
        {
            var requestInDb = _context.requests.Include(el => el.advert).FirstOrDefault(el=>el.id == requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.advert.ownerId!= userId)throw new ArgumentException("You do not have the access.");
            requestInDb.advert.performerId = requestInDb.userId;
            requestInDb.advert.status = DAL.Enums.AdvertStatusEnum.process;
            requestInDb.status = DAL.Enums.RequestStatusEnum.confirmed;
            await _context.requests.Where(el => el.advertId == requestInDb.advertId && el.id != requestInDb.id).ForEachAsync(el => el.status = DAL.Enums.RequestStatusEnum.rejected); 
            await _context.SaveChangesAsync();
        }

        public async Task applyGeneratedRequest(int requestId, string userId)
        {
            var requestInDb = _context.requests.Include(el => el.advert).FirstOrDefault(el => el.id == requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.userId != userId) throw new ArgumentException("You do not have the access.");
            requestInDb.status = DAL.Enums.RequestStatusEnum.applied;
            await _context.SaveChangesAsync();
        }

        public async Task deleteRequest(int requestId, string userId)
        {
            var requestInDb = _context.requests.Include(el => el.advert).FirstOrDefault(el => el.id == requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.userId != userId) throw new ArgumentException("You do not have the access.");
            _context.requests.Remove(requestInDb);
            await _context.SaveChangesAsync();
        }

        public async Task rejectRequest(int requestId, string userId)
        {
            var requestInDb = _context.requests.Include(el => el.advert).FirstOrDefault(el => el.id == requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.advert.ownerId != userId) throw new ArgumentException("You do not have the access.");
            requestInDb.status = DAL.Enums.RequestStatusEnum.rejected;
            await _context.SaveChangesAsync();
        }
    }
}

