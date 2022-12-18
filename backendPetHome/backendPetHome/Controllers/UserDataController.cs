using backendPetHome.BLL.DTOs;
using backendPetHome.BLL.DTOs.Request;
using backendPetHome.BLL.DTOs.User;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Models;
using backendPetHome.Models.QueryParameters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        public async Task<ActionResult<IEnumerable<Advert>>> GetUserAdverts([FromQuery] UserAdvertsParameters parameters)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var advertsAndCount = _userDataService.getCurrentUserAdverts(userId, parameters);
            Response.Headers.Add("X-Pagination-Total-Count", JsonConvert.SerializeObject(advertsAndCount.Item2));
            return Ok(advertsAndCount.Item1);
        }
        [HttpGet("myadverts/{id}")]
        public async Task<ActionResult<IEnumerable<AdvertUserDTO>>> GetUserCertainAdvert(int id)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            AdvertUserDTO? advertInDb = await _userDataService.getCurrentUserCertainAdvert(id);
            if (advertInDb == null) return NotFound();
            if (advertInDb?.ownerId != userId) return Forbid();
            return Ok(advertInDb);
        }
        [HttpGet("myprofile")]
        public async Task<ActionResult<UserDTO>> GetUserProfile()
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var user = await _userDataService.getCurrentUserProfile(userId);
            if (user == null) return BadRequest("User not found");
            return Ok(user);
        }
        [HttpGet("myrequests")]
        public async Task<ActionResult<IEnumerable<RequestDTO>>> GetUserRequests()
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var requests = _userDataService.getCurrentUserRequests(userId);
            return Ok(requests);
        }
        [HttpDelete]
        public async Task<OkResult> Delete()
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _userDataService.deleteUserProfile(userId);
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult> UpdateProfile([FromForm] UserRedoDTO data, IFormFile? userPhoto)
        {
            if(userPhoto != null)
            {
                var filePath = Path.Combine(Environment.CurrentDirectory, "wwwroot", "images", userPhoto.FileName);
                using (var stream = System.IO.File.Create(filePath))
                {
                    await userPhoto.CopyToAsync(stream);
                }
            }
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _userDataService.updateUserProfile(userId,data,userPhoto?.FileName);
            return Ok();
        }
        [HttpPut("myadverts/{id}")]
        public async Task<ActionResult> UpdateAdvert([FromForm] AdvertDTO data, IFormFile? advertPhoto, int id)
        {
            if (advertPhoto != null)
            {
                var filePath = Path.Combine(Environment.CurrentDirectory, "wwwroot", "images", advertPhoto.FileName);
                using (var stream = System.IO.File.Create(filePath))
                {
                    await advertPhoto.CopyToAsync(stream);
                }
            }
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _userDataService.updateUserAdvert(userId, data, id, advertPhoto?.FileName);
            return Ok();
        }
    }
}
