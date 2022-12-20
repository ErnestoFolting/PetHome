using AutoMapper;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class UserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<UserDTO> getCertainUser(string id)
        {
            var user = await _context.users.Include(u => u.timeExceptions).FirstOrDefaultAsync(u=>u.Id==id);
            if (user == null) throw new ArgumentException("That user not exists.");
            UserDTO userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }
    }
}
