using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Enums;
using backendPetHome.DAL.Specifications.QueryParameters;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class AdvertService
    {
        private readonly DataContext _context;
        private readonly RequestService _requestService;
        private readonly IMapper _mapper;
        public AdvertService(DataContext context, RequestService requestService, IMapper mapper)
        {
            _context = context;
            _requestService = requestService;
            _mapper = mapper;
        }
        public Tuple<IEnumerable<AdvertDTO>,int> getAdverts(string userId, AdvertsParameters parameters)
        {
            IEnumerable<Advert> fitAdverts = _context.adverts.Where(
                el => el.status == AdvertStatusEnum.search
                && el.cost >= parameters.priceFrom && el.cost <= parameters.priceTo
                && (parameters.isDatesFit ?
                !_context.timeExceptions.Any(timeException => timeException.userId == userId && timeException.date >= el.startTime && timeException.date <= el.endTime) : true));

            IEnumerable<AdvertDTO> advertsDTO = _mapper.Map<IEnumerable<AdvertDTO>>(
                    fitAdverts
                    .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                    .Take(parameters.PageSize));

            return (Tuple.Create(advertsDTO, fitAdverts.Count()));
        }

        public AdvertDTO getAdvertById(int advertId)
        {
            var advert = _context.adverts.Include(el => el.owner).FirstOrDefault(a => a.Id == advertId);
            AdvertDTO advertDTO = _mapper.Map<AdvertDTO>(advert);
            return advertDTO;
        }

        public async Task<Tuple<IEnumerable<string>,AdvertDTO>> addAdvert(AdvertDTO advertToAdd, string userId,string fileName)
        {
            Advert newAdvert = _mapper.Map<Advert>(advertToAdd);
            newAdvert.photoFilePath = "/images/" + fileName;
            newAdvert.ownerId = userId;
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
            IEnumerable<string> possiblePerformers = await _context.selectPossiblePerformers(advert.startTime, advert.endTime, advert.locationLng, advert.locationLat, ownerId).Select(el=>el.Id).ToListAsync();
            return possiblePerformers;
        }
        public Task MarkAsFinished(int advertId, string userId) {
            var advertInDb = _context.adverts.FirstOrDefault(el => el.Id == advertId);
            if (advertInDb == null) throw new ArgumentException("That advert not exists.");
            if (advertInDb.ownerId!= userId) throw new ArgumentException("You do not have the access.");
            advertInDb.status = AdvertStatusEnum.finished;
            _context.Update(advertInDb);
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
