using backendPetHome.DAL.Enums;
using backendPetHome.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using static backendPetHome.DAL.Models.User;

namespace backendPetHome.BLL.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string surname { get; set; }
        public string name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public SexEnum sex { get; set; }
        public string photoFilePath { get; set; } = string.Empty;
        public string location { get; set; } = string.Empty;

        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public bool ifHaveRequests { get; set; } = true;
        public IEnumerable<TimeExceptionDTO> timeExceptions { get; set; }
    }
}
