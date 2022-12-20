using AutoMapper;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.MappingProfiles.AdvertProfiles
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
