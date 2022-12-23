using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;

namespace backendPetHome.BLL.DTOs.AdvertDTOs
{
    public class AdvertUserDTO : AdvertDTO
    {
        public string ownerId { get; set; }
        public IEnumerable<RequestDTO> requests { get; set; }
        public bool ifHaveAppliedRequests { get; set; }
        public string? performerId { get; set; }
        public UserDTO? performer { get; set; }
    }
}
