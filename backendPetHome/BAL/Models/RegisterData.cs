using backendPetHome.DAL.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backendPetHome.BLL.Models
{
    public class RegisterData
    {
        [Required(ErrorMessage = "Username is required.")]
        public string username { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        public string password { get; set; }
        [EmailAddress]
        [Required(ErrorMessage = "Email is required.")]
        public string email { get; set; }
        public string surname { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string file { get; set; }
        public SexEnum sex { get; set; }
    }
}
