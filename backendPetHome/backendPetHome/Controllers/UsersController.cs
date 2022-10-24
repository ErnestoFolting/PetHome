using backendPetHome.Controllers.Models;
using Microsoft.AspNetCore.Mvc;

namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public UsersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _dataContext.users.ToListAsync()); 
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = _dataContext.users.FindAsync(id).Result;
            if (user == null) return BadRequest("User not found");
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> Post([FromBody] User dto)
        {
            _dataContext.users.Add(dto);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.users.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<User>>> Put(int id, [FromBody] User dto)
        {
            var user = await _dataContext.users.FindAsync(id);
            if (user == null) return BadRequest("User not found");
            user.Surname = dto.Surname;
            user.age = dto.age;
            user.sex = dto.sex;
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {
            var user = _dataContext.users.FindAsync(id).Result;
            if (user == null) return BadRequest("User not found");
            _dataContext.users.Remove(user);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.users.ToListAsync());
        }
    }
}
