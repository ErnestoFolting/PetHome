using DAL.Enums;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace DAL.Models
{

    
    public class User:IdentityUser
    {
        public string surname { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public SexEnum sex { get; set; } = SexEnum.male;
        public IEnumerable<Advert>? postedAdverts;
        public IEnumerable<Advert>? performAtAdverts;
        public IEnumerable<Request>? requests;
        public IEnumerable<Interval>? timeIntervals;
        public IEnumerable<RefreshToken>? refreshTokens;
    }
}
