using Microsoft.AspNetCore.Mvc;
using backendPetHome.BLL.Services;
using backendPetHome.BLL.DTOs.UserDTOs;
using Microsoft.AspNetCore.Authorization;
using backendPetHome.API.Controllers.Abstract;

namespace backendPetHome.API.Controllers
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

        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> GetUsers()
        {
            Console.WriteLine("check");

            var users = await _userService.getUsers(UserId);
            return Ok(users);

        }
    }
}
