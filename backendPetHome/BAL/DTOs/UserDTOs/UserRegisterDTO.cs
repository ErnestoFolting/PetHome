using backendPetHome.DAL.Enums;

namespace backendPetHome.BLL.DTOs.UserDTOs
{
    public class UserRegisterDTO : UserRedoDTO
    {
        public string UserName { get; set; } 
        public string password { get; set; }
        public SexEnum sex { get; set; }
    }
}
