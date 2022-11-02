using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backendPetHome.DAL.Models
{
    public class RefreshToken
    {
        public int id { get; set; }
        public string token { get; set; } = string.Empty;
        public DateTime created { get; set; } = DateTime.Now;
        public DateTime expires { get; set; } = DateTime.Now.AddDays(7);
        public string ownerId { get; set; }
        public User owner { get; set; }
        public bool isNotActual { get; set; } = false;
    }
}
