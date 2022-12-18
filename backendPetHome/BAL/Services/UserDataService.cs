using AutoMapper;
using backendPetHome.BLL.DTOs;
using backendPetHome.BLL.DTOs.Request;
using backendPetHome.BLL.DTOs.User;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;
using backendPetHome.Models.QueryParameters;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class UserDataService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserDataService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public Tuple<IEnumerable<Advert>, int> getCurrentUserAdverts(string userId, UserAdvertsParameters parameters)
        {
            IEnumerable<Advert> fitAdverts = _context.adverts
                .Include(advert=>advert.requests)
                .Where(
                el => el.ownerId == userId 
                && el.status == parameters.advertsStatus
                && el.cost >= parameters.priceFrom && el.cost <= parameters.priceTo);

            return (Tuple.Create(fitAdverts
                    .Skip((parameters.PageNumber - 1) * parameters.PageSize)
                    .Take(parameters.PageSize), fitAdverts.Count()));
        }
        public async Task<AdvertUserDTO?> getCurrentUserCertainAdvert(int advertId)
        {
            Advert? advertInDb = await _context.adverts
                .Include(advert => advert.requests)
                .ThenInclude(request=>request.user)
                .FirstOrDefaultAsync(el => el.Id == advertId);
            AdvertUserDTO advertUserDTO = _mapper.Map<AdvertUserDTO>(advertInDb);
            return advertUserDTO;
        }
        public async Task<UserDTO> getCurrentUserProfile(string id)
        {
            User? user = await _context.users
                .Include(u => u.timeExceptions)
                .Include(u => u.requests)
                .FirstOrDefaultAsync(u => u.Id == id);
            UserDTO userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }
        public IEnumerable<RequestDTO> getCurrentUserRequests(string id)
        {
            IEnumerable<Request> requests= _context.requests.Include(r => r.advert).Where(el => el.userId == id);
            IEnumerable<RequestDTO> requestDTOs = _mapper.Map<IEnumerable<RequestDTO>>(requests);
            return requestDTOs;
        }

        public Task deleteUserProfile(string userId)
        {
            var userInDb = _context.users.FirstOrDefault(el => el.Id == userId);
            if(userInDb != null)
            {
                _context.users.Remove(userInDb);
            }
            else
            {
                throw new ArgumentException("User does not exist.");
            }
            return _context.SaveChangesAsync();
        }
        public Task updateUserProfile(string userId, UserRedoDTO redoData, string newFileName)
        {
            var userInDb = _context.users.FirstOrDefault(el => el.Id == userId);
            if(userInDb == null)
            {
                throw new ArgumentException("User does not exist.");
            }
            else
            {
                userInDb = _mapper.Map(redoData, userInDb);
                if(newFileName != null) userInDb.photoFilePath = "/images/" + newFileName;

                _context.Update(userInDb);
            }
            return _context.SaveChangesAsync();
        }

        public Task updateUserAdvert(string userId, AdvertDTO data, int advertId, string? newFileName)
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
            return _context.SaveChangesAsync();
        }
    }
}
