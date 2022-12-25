using Microsoft.AspNetCore.Mvc;
using backendPetHome.BLL.Services;
using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.Controllers.Abstract;

namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> Get(string id)
        {
            var user = await _userService.getCertainUser(id);
            return Ok(user);
        }
    }
}
