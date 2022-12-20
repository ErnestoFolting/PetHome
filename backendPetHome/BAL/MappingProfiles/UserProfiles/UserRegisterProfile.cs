using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.DAL.Models;
using AutoMapper;

namespace backendPetHome.BLL.MappingProfiles.UserProfiles
{
    public class UserRegisterProfile:Profile
    {
        public UserRegisterProfile()
        {
            CreateMap<UserRegisterDTO, User>();
        }
    }
}
