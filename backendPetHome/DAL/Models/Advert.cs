using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public  class Advert
    {
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        public string description { get; set; }
    }
}
