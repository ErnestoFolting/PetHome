using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.DAL.Enums;
using System.Text.Json.Serialization;

namespace backendPetHome.BLL.DTOs.AdvertDTOs
{
    public class AdvertDTO: AdvertCreateRedoDTO
    {
        public int id { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public AdvertStatusEnum status { get; set; }
        public string? photoFilePath { get; set; } = string.Empty;
        public UserDTO? owner { get; set; }
        public string?  ownerId { get; set; }
    }
}
