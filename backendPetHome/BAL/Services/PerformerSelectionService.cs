using AutoMapper;
using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.Services.Abstract;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces;
using backendPetHome.DAL.Specifications.RequestSpecifications;

namespace backendPetHome.BLL.Services
{
    public class PerformerSelectionService: BaseService
    {
        public PerformerSelectionService(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork, mapper)
        {
        }
        public async Task<RequestDTO> GetRequestWithUserAndAdvert(int requestId)
        {
            Request? requestInDb = await _unitOfWork.RequestRepository.GetByIdSpecification(new RequestByIdWithAdvertAndUserSpecification(requestId));
            if (requestInDb == null) throw new ArgumentNullException("Request not found");
            RequestDTO requestDTO = _mapper.Map<RequestDTO>(requestInDb);
            return requestDTO;
        }
    }
}
