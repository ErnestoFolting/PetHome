using AutoMapper;
using backendPetHome.BLL.DTOs.RefreshTokenDTOs;
using backendPetHome.DAL.Entities;

namespace backendPetHome.BLL.MappingProfiles.AdvertProfiles
{
    public class RefreshTokenProfile : Profile
    {
        public RefreshTokenProfile()
        {
            CreateMap<RefreshToken, RefreshTokenDTO>();
        }
    }
}
