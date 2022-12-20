using AutoMapper;
using backendPetHome.BLL.DTOs;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.MappingProfiles
{
    public class TimeExceptionProfile:Profile
    {
        public TimeExceptionProfile()
        {
            CreateMap<TimeException, TimeExceptionDTO>();
            CreateMap<TimeExceptionDTO, TimeException>();
        }
    }
}
