using AutoMapper;
using backendPetHome.BLL.DTOs;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(destination => destination.ifHaveRequests, opt => opt.MapFrom(source => source.requests.Any()));
            CreateMap<UserDTO, User>();
        }
    }   
}
