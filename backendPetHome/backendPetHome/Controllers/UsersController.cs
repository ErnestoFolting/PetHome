using Microsoft.AspNetCore.Mvc;
using backendPetHome.BLL.DTOs;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Models;

namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _userService.getAllUsers());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await _userService.getCertainUser(id);
            if (user == null) return BadRequest("User not found");
            return Ok(user);
        }

        [HttpPost]
        public async Task<OkResult> Post([FromBody] UserDTO dto)
        {
            await _userService.addUser(dto);
            return Ok();
        }

        //[HttpPut("{id}")]
        //public async Task<ActionResult<List<User>>> Put(int id, [FromBody] User dto)
        //{
        //    var user = await _dataContext.users.FindAsync(id);
        //    if (user == null) return BadRequest("User not found");
        //    user.Surname = dto.Surname;
        //    user.age = dto.age;
        //    user.sex = dto.sex;
        //    await _dataContext.SaveChangesAsync();
        //    return Ok(await _dataContext.users.ToListAsync());
        //}

        [HttpDelete("{id}")]
        public async Task<OkResult> Delete(int id)
        {
            await _userService.deleteUser(id);
            return Ok();
        }
    }
}
