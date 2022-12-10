using AutoMapper;
using backendPetHome.BLL.DTOs.User;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.MappingProfiles
{
    public class UserRedoProfile : Profile
    {
        public UserRedoProfile()
        {
            CreateMap<UserRedoDTO, User>();
        }
    }
}
                                                                                                                                                                       