using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backendPetHome.DAL.Models
{
    public class TimeException
    {
        public int id { get; set; }
        public string userId { get; set; }
        public User user { get; set; }
        [Required]
        public DateTime date { get; set; }
    }
}
