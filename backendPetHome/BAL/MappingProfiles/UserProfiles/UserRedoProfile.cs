using AutoMapper;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.MappingProfiles.UserProfiles
{
    public class UserRedoProfile : Profile
    {
        public UserRedoProfile()
        {
            CreateMap<UserRedoDTO, User>();
        }
    }
}
