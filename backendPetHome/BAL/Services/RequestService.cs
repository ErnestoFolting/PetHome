using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class RequestService
    {
        private readonly DataContext _context;
        private readonly TimeExceptionService _timeExceptionService;
        public RequestService(DataContext context, TimeExceptionService timeExceptionService)
        {
            _context = context;
            _timeExceptionService = timeExceptionService;
        }
        public Task addRequest(string userId, int advertId, DAL.Enums.RequestStatusEnum status)
        {
            Advert? advertInDb = _context.adverts.Find(advertId);
            if (advertInDb == null) throw new ArgumentException("The advert does not exist");
            if (advertInDb.ownerId == userId) throw new ArgumentException("You can not send a request on your own advert.");
            if (!_timeExceptionService.checkPerformerDates(userId, advertInDb.startTime, advertInDb.endTime)) throw new ArgumentException("You can not perform at that dates. Remove the time exceptions and try again.");
            Request newRequest = new(); 
            newRequest.userId = userId;
            newRequest.advertId = advertId;
            newRequest.status = status;
            _context.requests.Add(newRequest);
            return _context.SaveChangesAsync();
        }

        public List<DateTime> getListOfDates(DateTime date1, DateTime date2)
        {
            List<DateTime> allDates = new();
            for (DateTime date = date1; date <= date2; date = date.AddDays(1))
                allDates.Add(date);
            return allDates;
        }

        public async Task confirmRequest(int requestId, string userId)
        {
            var requestInDb = _context.requests.Include(el => el.advert).FirstOrDefault(el=>el.id == requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.advert.ownerId!= userId)throw new ArgumentException("You do not have the access.");
            if (!_timeExceptionService.checkPerformerDates(requestInDb.userId, requestInDb.advert.startTime, requestInDb.advert.endTime)) throw new ArgumentException("This user can not perform at that dates.");
            requestInDb.advert.performerId = requestInDb.userId;
            requestInDb.advert.status = DAL.Enums.AdvertStatusEnum.process;
            requestInDb.status = DAL.Enums.RequestStatusEnum.confirmed;
            List<DateTime> datesToExceptAtPerformer = getListOfDates(requestInDb.advert.startTime, requestInDb.advert.endTime);
            await _timeExceptionService.addTimeExceptions(requestInDb.userId, datesToExceptAtPerformer);
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

