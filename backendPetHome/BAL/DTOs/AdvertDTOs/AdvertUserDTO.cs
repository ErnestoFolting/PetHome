using backendPetHome.BLL.DTOs.RequestDTOs;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.DAL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backendPetHome.BLL.DTOs.AdvertDTOs
{
    public class AdvertUserDTO : AdvertDTO
    {
        public string ownerId { get; set; }
        public IEnumerable<RequestDTO> requests { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AdvertStatusEnum status { get; set; }
        public bool ifHaveAppliedRequests { get; set; }
        public string? performerId { get; set; }
        public UserDTO? performer { get; set; }
    }
}
