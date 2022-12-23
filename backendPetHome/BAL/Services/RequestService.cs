using AutoMapper;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;

namespace backendPetHome.BLL.Services
{
    public class RequestService: BaseService
    {
        private readonly TimeExceptionService _timeExceptionService;
        public RequestService(IUnitOfWork unitOfWork, IMapper mapper, TimeExceptionService timeExceptionService) : base(unitOfWork, mapper)
        {
            _timeExceptionService = timeExceptionService;
        }
        public async Task addRequest(string userId, int advertId, DAL.Enums.RequestStatusEnum status)
        {
            Advert? advertInDb = await _unitOfWork.AdvertRepository.GetById(advertId);
            if (advertInDb == null) throw new ArgumentException("The advert does not exist");
            if (advertInDb.ownerId == userId) throw new ArgumentException("You can not send a request on your own advert.");
            if (!_timeExceptionService.checkPerformerDates(userId, advertInDb.startTime, advertInDb.endTime)) throw new ArgumentException("You can not perform at that dates. Remove the time exceptions and try again.");
            
            Request newRequest = new();
            newRequest.userId = userId;
            newRequest.advertId = advertId;
            newRequest.status = status;

            await _unitOfWork.RequestRepository.Add(newRequest);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task confirmRequest(int requestId, string userId)
        {
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdIncludesAdvert(requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.advert.ownerId!= userId)throw new ArgumentException("You do not have the access.");
            if (!_timeExceptionService.checkPerformerDates(requestInDb.userId, requestInDb.advert.startTime, requestInDb.advert.endTime)) throw new ArgumentException("This user can not perform at that dates.");
            
            requestInDb.advert.performerId = requestInDb.userId;
            requestInDb.advert.status = DAL.Enums.AdvertStatusEnum.process;
            requestInDb.status = DAL.Enums.RequestStatusEnum.confirmed;

            List<DateTime> datesToExceptAtPerformer = getListOfDates(requestInDb.advert.startTime, requestInDb.advert.endTime);
            await _timeExceptionService.addTimeExceptions(requestInDb.userId, datesToExceptAtPerformer);
            var requestsToReject = await _unitOfWork.RequestRepository.GetCurrentAdvertNotCurrent(requestInDb);
            requestsToReject.ForEach(r => r.status = DAL.Enums.RequestStatusEnum.rejected);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task applyGeneratedRequest(int requestId, string userId)
        {
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdIncludesAdvert(requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.userId != userId) throw new ArgumentException("You do not have the access.");
            requestInDb.status = DAL.Enums.RequestStatusEnum.applied; //update?
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task deleteRequest(int requestId, string userId)
        {
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdIncludesAdvert(requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.userId != userId) throw new ArgumentException("You do not have the access.");
            await _unitOfWork.RequestRepository.Delete(requestInDb);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task rejectRequest(int requestId, string userId)
        {
            var requestInDb = await _unitOfWork.RequestRepository.GetByIdIncludesAdvert(requestId);
            if (requestInDb == null) throw new ArgumentException("This request does not exist.");
            if (requestInDb.advert.ownerId != userId) throw new ArgumentException("You do not have the access.");
            requestInDb.status = DAL.Enums.RequestStatusEnum.rejected;
            await _unitOfWork.SaveChangesAsync(); ;
        }
        public List<DateTime> getListOfDates(DateTime date1, DateTime date2)
        {
            List<DateTime> allDates = new();
            for (DateTime date = date1; date <= date2; date = date.AddDays(1))
                allDates.Add(date);
            return allDates;
        }
    }
}

