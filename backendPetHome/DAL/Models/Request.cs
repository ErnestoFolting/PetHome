using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Request
    {
        public enum requestStatusEnum
        {
            generated = 0,
            applied = 1,
            confirmed = 2
        }
        public int id { get; set; }
        public int userId { get; set; }
        public User user { get; set; }
        public int advertId { get; set; }
        public Advert advert { get; set; }
        public requestStatusEnum status { get; set; }

    }
}
