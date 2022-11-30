using AutoMapper;
using backendPetHome.BLL.DTOs;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.MappingProfiles
{
    public class AdvertProfile : Profile
    {
        public AdvertProfile()
        {
            CreateMap<Advert, AdvertDTO>();
            CreateMap<AdvertDTO, Advert>();
        }
    }
}
