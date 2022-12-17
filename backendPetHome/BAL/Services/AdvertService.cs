﻿using AutoMapper;
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
        private readonly RequestService _requestService;
        private readonly IMapper _mapper;
        public AdvertService(DataContext context, RequestService requestService, IMapper mapper)
        {
            _context = context;
            _requestService = requestService;
            _mapper = mapper;
        }
        public IEnumerable<Advert> getAdverts(int limit, int page)
        {
            return _context.adverts.Where(el=>el.status == AdvertStatusEnum.search).Skip((page-1) * limit).Take(limit);
        }

        public Advert getAdvertById(int advertId)
        {
            var advert = _context.adverts.Include(el => el.owner).FirstOrDefault(a => a.Id == advertId);
            return advert;
        }

        public async Task<Tuple<IEnumerable<string>,AdvertDTO>> addAdvert(AdvertDTO advertToAdd, string userId,string fileName)
        {
            Advert newAdvert = _mapper.Map<Advert>(advertToAdd);
            newAdvert.photoFilePath = "/images/" + fileName;
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
            IEnumerable<string> possiblePerformers = _context.selectPossiblePerformers(advert.startTime, advert.endTime, advert.locationLng, advert.locationLat, ownerId).Select(el=>el.Id).ToList();
            return possiblePerformers;
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
