using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Models.User;

namespace BAL.DTOs
{
    public class UserDTO
    {
        public int id { get; set; }
        public string surname { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public sexEnum sex { get; set; }

    }
}
