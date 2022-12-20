namespace backendPetHome.BLL.DTOs.UserDTOs
{
    public class UserRedoDTO
    {
        public string surname { get; set; }
        public string name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string location { get; set; } = string.Empty;
        public double locationLat { get; set; } = 0;
        public double locationLng { get; set; } = 0;

    }
}
