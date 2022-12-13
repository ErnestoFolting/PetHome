﻿using AutoMapper;
using backendPetHome.BLL.DTOs;
using backendPetHome.BLL.DTOs.Request;
using backendPetHome.BLL.DTOs.User;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;
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
        public IEnumerable<Advert> getCurrentUserAdverts(string userId)
        {
            return _context.adverts.Include(advert => advert.requests).Where(a => a.ownerId == userId);
        }
        public async Task<Advert?> getCurrentUserCertainAdvert(int advertId)
        {
            Advert? advertInDb = await _context.adverts.Include(advert => advert.requests).ThenInclude(request=>request.user).FirstOrDefaultAsync(el => el.Id == advertId);
            return advertInDb;
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
    }
}
