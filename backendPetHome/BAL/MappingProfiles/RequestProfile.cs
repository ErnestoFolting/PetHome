using AutoMapper;
using backendPetHome.BLL.DTOs.Request;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.MappingProfiles
{
    public class RequestProfile : Profile
    {
        public RequestProfile()
        {
            CreateMap<Request, RequestDTO>();
            CreateMap<RequestDTO, Request>();
        }
    }
}
