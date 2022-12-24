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
            if (user == null) throw new ArgumentException("That user not exists.");
            UserDTO userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }
    }
}
