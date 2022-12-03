using AutoMapper;
using backendPetHome.BLL.DTOs;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Enums;
using backendPetHome.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class AdvertService
    {
        private readonly DataContext _context;
        private readonly TimeExceptionService _timeExceptionService;
        private readonly RequestService _requestService;
        private readonly IMapper _mapper;
        public AdvertService(DataContext context, TimeExceptionService timeExceptionService, RequestService requestService, IMapper mapper)
        {
            _context = context;
            _timeExceptionService = timeExceptionService;
            _requestService = requestService;
            _mapper = mapper;
        }
        public IEnumerable<Advert> getAllAdverts()
        {
            return _context.adverts.Where(el=>el.status == AdvertStatusEnum.search);
        }

        public Advert getAdvertById(int advertId)
        {
            var advert = _context.adverts.Include(el => el.owner).FirstOrDefault(a => a.Id == advertId);
            Console.WriteLine(advert.owner.name);
            return advert;
        }

        public async Task<Tuple<IEnumerable<string>,AdvertDTO>> addAdvert(AdvertDTO advertToAdd, string userId)
        {
            Advert newAdvert = _mapper.Map<Advert>(advertToAdd);
            newAdvert.ownerId = userId;
            newAdvert.status = AdvertStatusEnum.search;
            _context.adverts.Add(newAdvert);
            await _context.SaveChangesAsync();
            IEnumerable<string> possiblePerformers = await choosePossiblePerformers(newAdvert, userId);
            foreach(string possiblePerformerId in possiblePerformers)
            {
                await _requestService.addRequest(possiblePerformerId, newAdvert.Id, RequestStatusEnum.generated);
            }
            await _context.SaveChangesAsync();
            AdvertDTO advertDTO = _mapper.Map<AdvertDTO>(newAdvert);
            return Tuple.Create(possiblePerformers, advertDTO);
        }
        public async Task<IEnumerable<string>> choosePossiblePerformers(Advert advert, string ownerId)
        {
            IEnumerable<User> possiblePerformers = await _context.users.ToListAsync();
            IEnumerable<string> possiblePerformersIds = possiblePerformers
                .Where(el => 
                _timeExceptionService.checkPerformerDates(el.Id, advert.startTime, advert.endTime) 
                && el.Id != ownerId
                && DistanceEvaluater.DistanceBetweenPlaces(el.locationLng,el.locationLat,advert.locationLng,advert.locationLat) < 30)
                .Select(el => el.Id)
                .ToList();
            return possiblePerformersIds;
        }
        public Task MarkAsFinished(int advertId, string userId) {
            var advertInDb = _context.adverts.FirstOrDefault(el => el.Id == advertId);
            if (advertInDb == null) throw new ArgumentException("That advert not exists.");
            if (advertInDb.ownerId!= userId) throw new ArgumentException("You do not have the access.");
            advertInDb.status = AdvertStatusEnum.finished;
            return _context.SaveChangesAsync();
        }
        public Task deleteAdvert(int advertId, string userId)
        {
            var advertInDb = _context.adverts.FirstOrDefault(el => el.Id == advertId);
            if (advertInDb == null) throw new ArgumentException("That advert not exists.");
            if (advertInDb.ownerId != userId) throw new ArgumentException("You do not have the access.");
            _context.adverts.Remove(advertInDb);
            return _context.SaveChangesAsync();
        }
    }
}
