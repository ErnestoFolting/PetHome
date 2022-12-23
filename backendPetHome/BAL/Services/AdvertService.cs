﻿using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Enums;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.AdvertSpecifications;
using backendPetHome.DAL.Specifications.QueryParameters;
using backendPetHome.DAL.Specifications.RequestSpecifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class AdvertService : BaseService
    {
        private readonly DataContext _context;
        private readonly RequestService _requestService;

        public AdvertService(DataContext context, IUnitOfWork unitOfWork, RequestService requestService, IMapper mapper)
            :base(unitOfWork,mapper)
        {
            _context = context;
            _requestService = requestService;
        }
        public async Task<(List<AdvertDTO> fitAdvertsDTO, int totalCount)> getAdverts(QueryStringParameters parameters)
        {
            var fitAdverts = await _unitOfWork.AdvertRepository.GetBySpecificationAndPaging(new AdvertWithParamsAndPaginationSpecification(parameters));
            List<AdvertDTO> advertsDTO = _mapper.Map<List<AdvertDTO>>(fitAdverts.fitAdverts);
            return (advertsDTO, fitAdverts.totalCount);
        }

        public async Task<AdvertDTO> getAdvertById(int advertId)
        { 
            Advert? advert = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdWithOwnerSpecification(advertId));
            if (advert == null) throw new ArgumentException("Advert not found");
            AdvertDTO advertDTO = _mapper.Map<AdvertDTO>(advert);
            return advertDTO;
        }

        public async Task<Tuple<IEnumerable<string>,AdvertDTO>> addAdvert(AdvertDTO advertToAdd, string userId,string fileName)
        {
            Advert newAdvert = _mapper.Map<Advert>(advertToAdd);
            newAdvert.photoFilePath = "/images/" + fileName;
            newAdvert.ownerId = userId;
            await _unitOfWork.AdvertRepository.Add(newAdvert);
            await _unitOfWork.SaveChangesAsync();

            IEnumerable<string> possiblePerformers = await choosePossiblePerformers(newAdvert, userId);
            foreach(string possiblePerformerId in possiblePerformers)
            {
                await _requestService.addRequest(possiblePerformerId, newAdvert.Id, RequestStatusEnum.generated);
            }
            await _unitOfWork.SaveChangesAsync();

            AdvertDTO advertDTO = _mapper.Map<AdvertDTO>(newAdvert);
            return Tuple.Create(possiblePerformers, advertDTO);
        }
        public async Task<IEnumerable<string>> choosePossiblePerformers(Advert advert, string ownerId)
        {
            IEnumerable<string> possiblePerformers = await 
                _context.selectPossiblePerformers(advert.startTime, advert.endTime, advert.locationLng, advert.locationLat, ownerId)
                .Select(el=>el.Id)
                .ToListAsync();
            return possiblePerformers;
        }
        public async Task MarkAsFinished(int advertId, string userId) {
            var advertInDb = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdSpecification(advertId));
            if (advertInDb == null) throw new ArgumentException("That advert not exists.");
            if (advertInDb.ownerId!= userId) throw new ArgumentException("You do not have the access.");
            advertInDb.status = AdvertStatusEnum.finished;
            await _unitOfWork.AdvertRepository.Update(advertInDb);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task deleteAdvert(int advertId, string userId)
        {
            var advertInDb = await _unitOfWork.AdvertRepository.GetByIdSpecification(new AdvertByIdSpecification(advertId));
            if (advertInDb == null) throw new ArgumentException("That advert not exists.");
            if (advertInDb.ownerId != userId) throw new ArgumentException("You do not have the access.");
            await _unitOfWork.AdvertRepository.Delete(advertInDb);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
