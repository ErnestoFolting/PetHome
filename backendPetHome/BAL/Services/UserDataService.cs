using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.AdvertSpecifications;
using backendPetHome.DAL.Specifications.QueryParameters;
using backendPetHome.DAL.Specifications.RequestSpecifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class UserDataService : BaseService
    {
        private readonly DataContext _context;
        public UserDataService(DataContext context, IUnitOfWork unitOfWork, IMapper mapper): base(unitOfWork, mapper)
        {
            _context = context;
        }
        public async Task<(List<AdvertUserDTO> fitAdvertsDTO, int totalCount)> getCurrentUserAdverts(string userId, QueryStringParameters parameters)
        {
            var tuple = await 
                _unitOfWork.AdvertRepository
                .GetBySpecificationAndPaging(new AdvertCurrentUserWithParamsAndPaginationIncludesRequestSpecification(userId, parameters));
            List<AdvertUserDTO> fitAdvertsDTO = _mapper.Map<List<AdvertUserDTO>>(tuple.fitAdverts);
            return (fitAdvertsDTO, tuple.totalCount);
        }
        public async Task<AdvertUserDTO?> getCurrentUserCertainAdvert(string userId, int advertId)
        {
            Advert? advertInDb = await 
                _unitOfWork.AdvertRepository
                .GetByIdSpecification(new AdvertByIdIncludesRequestAndUserSpecification(advertId));
            if (advertInDb == null) throw new ArgumentException("Advert not found.");
            if (advertInDb.ownerId != userId) throw new ArgumentException("This is not your advert.");
            AdvertUserDTO advertUserDTO = _mapper.Map<AdvertUserDTO>(advertInDb);
            return advertUserDTO;
        }
        public async Task<UserDTO> getCurrentUserProfile(string id)
        {
            User? user = await _unitOfWork.UserRepository.GetByIdIncludesTimeException(id);
            UserDTO userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }
        public async Task<List<Request>> getCurrentUserRequests(string id)
        {
            //List<Request> requests = await _unitOfWork.RequestRepository.GetBySpecification(new RequestCurrentUserSpecification(id));
            List<Request> requests = await _context.requests.ToListAsync();
            //List<RequestDTO> requestDTOs = _mapper.Map<List<RequestDTO>>(requests);
            return requests;
        }

        public async Task<int> deleteUserProfile(string userId)
        {
            var userInDb = await _unitOfWork.UserRepository.GetById(userId);
            if(userInDb != null)
            {
                await _unitOfWork.UserRepository.Delete(userInDb);
            }
            else
            {
                throw new ArgumentException("User does not exist.");
            }
            return await _unitOfWork.SaveChangesAsync();
        }
        public async Task<int> updateUserProfile(string userId, UserRedoDTO redoData, string newFileName)
        {
            var userInDb = await _unitOfWork.UserRepository.GetById(userId);
            if(userInDb == null)
            {
                throw new ArgumentException("User does not exist.");
            }
            else
            {
                userInDb = _mapper.Map(redoData, userInDb);
                if(newFileName != null) userInDb.photoFilePath = "/images/" + newFileName;
                await _unitOfWork.UserRepository.Update(userInDb);
            }
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> updateUserAdvert(string userId, AdvertDTO data, int advertId, string? newFileName)
        {
            var advertInDb = _context.adverts.FirstOrDefault(el => el.Id == advertId);
            if (advertInDb == null)
            {
                throw new ArgumentException("Advert does not exist.");
            }
            else
            {
                data.id = advertId;
                data.photoFilePath = advertInDb.photoFilePath;
                advertInDb = _mapper.Map(data, advertInDb);
                if (newFileName != null) advertInDb.photoFilePath = "/images/" + newFileName;
                _context.Update(advertInDb);
            }
            return await _unitOfWork.SaveChangesAsync();
        }
    }
}
