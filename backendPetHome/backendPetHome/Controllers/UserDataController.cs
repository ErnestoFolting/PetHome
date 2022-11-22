using backendPetHome.BLL.Services;
using backendPetHome.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace backendPetHome.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserDataController : ControllerBase
    {
        private readonly UserDataService _userDataService;

        public UserDataController(UserDataService userDataService)
        {
            _userDataService = userDataService;
        }
        [HttpGet("myadverts")]
        public async Task<ActionResult<IEnumerable<Advert>>> GetUserAdverts()
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            return Ok(_userDataService.getCurrentUserAdverts(userId));
        }
        [HttpGet("myadverts/{id}")]
        public async Task<ActionResult<IEnumerable<Advert>>> GetUserCertainAdvert(int id)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            Advert? advertInDb = await _userDataService.getCurrentUserCertainAdvert(id);
            if (advertInDb == null) return NotFound();
            if (advertInDb.ownerId != userId) return Forbid();
            return Ok(advertInDb);
        }
        [HttpGet("myprofile")]
        public async Task<ActionResult<User>> GetUserProfile()
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var user = await _userDataService.getCurrentUserProfile(userId);
            if (user == null) return BadRequest("User not found");
            return Ok(user);
        }
        [HttpGet("myrequests")]
        public async Task<ActionResult<User>> GetUserRequests()
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var requests = _userDataService.getCurrentUserRequests(userId);
            return Ok(requests);
        }
    }
}
