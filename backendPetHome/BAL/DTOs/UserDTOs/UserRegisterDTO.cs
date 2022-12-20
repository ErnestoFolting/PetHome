using backendPetHome.DAL.Enums;

namespace backendPetHome.BLL.DTOs.UserDTOs
{
    public class UserRegisterDTO : UserRedoDTO
    {
        public string UserName { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public SexEnum sex { get; set; } = SexEnum.male;
    }
}
