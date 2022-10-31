using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace DAL.Models
{

    
    public class User:IdentityUser
    {
        public enum sexEnum
        { 
            male = 0,
            female = 1,
        }
        public string surname { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public sexEnum sex { get; set; } = sexEnum.male;
        public IEnumerable<Advert>? postedAdverts;
        public IEnumerable<Advert>? performAtAdverts;
        public IEnumerable<Request>? requests;
        public IEnumerable<Interval>? timeIntervals;
    }
}
