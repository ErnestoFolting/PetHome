using backendPetHome.DAL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static backendPetHome.DAL.Models.User;

namespace backendPetHome.BLL.DTOs
{
    public class UserDTO
    {
        public int id { get; set; }
        public string surname { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public SexEnum sex { get; set; }

    }
}
