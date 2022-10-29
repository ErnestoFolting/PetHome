using System.Text.Json.Serialization;

namespace DAL.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    
    public class User
    {
        public enum sexEnum
        {
            male = 0,
            female = 1,
        }
        public int id { get; set; }
        public string surname { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string phoneNumber { get; set; } = string.Empty;
        public sexEnum sex { get; set; } = sexEnum.male;
        public IEnumerable<Advert>? postedAdverts;
        public IEnumerable<Advert>? performAtAdverts;
        public IEnumerable<Request>? requests;
        public IEnumerable<Interval>? timeIntervals;
    }
}
