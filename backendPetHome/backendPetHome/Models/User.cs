namespace backendPetHome.Controllers.Models
{
    public enum sexEnum
    {
        male = 0,
        female = 1,
    }
    public class User
    {
        public int id { get; set; }
        public string Surname { get; set; }
        public int age{ get; set; }
        public sexEnum sex { get; set; } 
        public User()
        {
            Surname = "Generated";
            age = 20;
            sex = sexEnum.female;
            id = 0;
        }
    }
}
