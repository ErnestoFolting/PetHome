using FluentValidation;
using backendPetHome.BLL.DTOs.UserDTOs;

namespace backendPetHome.Validators.UserValidators
{
    public class UserLoginDTOValidator : AbstractValidator<UserLoginDTO>
    {
        public UserLoginDTOValidator()
        {
            RuleFor(u => u.username).NotEmpty();
            RuleFor(u => u.password).NotEmpty();
        }
    }
}
