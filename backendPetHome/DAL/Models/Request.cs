using backendPetHome.DAL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backendPetHome.DAL.Models
{
    public class Request
    {
        public int id { get; set; }
        public string userId { get; set; }
        public User user { get; set; }
        public int advertId { get; set; }
        public Advert advert { get; set; }
        public RequestStatusEnum status { get; set; }

    }
}
