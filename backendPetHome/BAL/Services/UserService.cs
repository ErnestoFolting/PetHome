using AutoMapper;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.UserSpecifications;

namespace backendPetHome.BLL.Services
{
    public class UserService: BaseService
    {
        public UserService(IUnitOfWork unitOfWork, IMapper mapper):base(unitOfWork, mapper)
        {
        }
        public async Task<UserDTO> getCertainUser(string id)
        {
            User? user = await _unitOfWork.UserRepository.GetByIdSpecification(new UserByIdWithTimeExceptionSpecification(id));
            if (user == null) throw new KeyNotFoundException("User not found.");

            UserDTO userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }
        public async Task<List<UserDTO>> getUsers(string adminId)
        {
            List<User>? users = await _unitOfWork.UserRepository.GetUsersSpecification(new AllUsersSpecification(adminId));
            if (users == null) throw new KeyNotFoundException("Users not found.");

            List<UserDTO> userDTOs = _mapper.Map<List<UserDTO>>(users);
            return userDTOs;
        }
    }
}
