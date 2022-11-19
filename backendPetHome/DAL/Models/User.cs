using backendPetHome.DAL.Enums;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace backendPetHome.DAL.Models
{
    public class User : IdentityUser
    {
        public string surname { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public SexEnum sex { get; set; } = SexEnum.male;
        public List<Advert> postedAdverts { get; set; } = new List<Advert>() ;
        public List<Advert> performAtAdverts { get; set; } = new List<Advert> () ;
        public List<Request> requests { get; set; } = new List<Request> () ;
        public List<TimeException> timeExceptions{ get; set; } = new List<TimeException> () ;
        public List<RefreshToken> refreshTokens { get; set; } = new List<RefreshToken>();
    }
}
