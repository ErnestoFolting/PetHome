using backendPetHome.DAL.Entities.Abstract;
using backendPetHome.DAL.Enums;
using System.Text.Json.Serialization;

namespace backendPetHome.DAL.Entities
{
    public class Request : BaseEntity
    {
        public int id { get; set; }
        public string userId { get; set; }
        public User user { get; set; }
        public int advertId { get; set; }
        public Advert advert { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RequestStatusEnum status { get; set; }

    }
}
