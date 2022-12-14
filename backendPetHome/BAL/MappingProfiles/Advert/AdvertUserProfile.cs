using AutoMapper;
using backendPetHome.BLL.DTOs;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.MappingProfiles
{
    public class AdvertUserProfile : Profile
    {
        public AdvertUserProfile()
        {
            CreateMap<Advert, AdvertUserDTO>()
                .ForMember(destination => destination.ifHaveAppliedRequests, opt => opt.MapFrom(source => source.requests.Any(el=> el.status == DAL.Enums.RequestStatusEnum.applied)));
            CreateMap<AdvertUserDTO, Advert>();
        }
    }
}
