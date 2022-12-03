using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backendPetHome.BLL.DTOs
{
    public class AdvertDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public int cost { get; set; }
        public string location { get; set; } = string.Empty;
        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;
        public string description { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }
    }
}
