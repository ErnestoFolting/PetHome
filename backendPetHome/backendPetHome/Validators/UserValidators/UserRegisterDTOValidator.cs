using backendPetHome.BLL.DTOs.UserDTOs;
using FluentValidation;
using backendPetHome.Validators.CommonValidators;

namespace backendPetHome.Validators.UserValidators
{
    public class UserRegisterDTOValidator : AbstractValidator<UserRegisterDTO>
    {
        public UserRegisterDTOValidator()
        {
            Include(new UserRedoDTOValidator()); //maybe another class hierarchy
            RuleFor(u => u.UserName).NotEmpty().MinimumLength(5);
            RuleFor(u => u.password).NotEmpty().Must(p => p!= null && p.IsValidPassword());
            RuleFor(u => u.sex).NotEmpty().IsInEnum();
        }
    }
}
