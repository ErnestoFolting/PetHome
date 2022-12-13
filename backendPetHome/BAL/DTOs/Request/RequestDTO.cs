using backendPetHome.DAL.Enums;
using System.Text.Json.Serialization;


namespace backendPetHome.BLL.DTOs.Request
{
    public class RequestDTO
    {
        public int id { get; set; }
        public string userId { get; set; }
        public UserDTO user { get; set; }
        public int advertId { get; set; }
        public AdvertDTO advert { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RequestStatusEnum status { get; set; }
    }
}
