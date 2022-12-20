using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.Models.QueryParameters;
using backendPetHome.BLL.Services;
using backendPetHome.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Security.Claims;

namespace backendPetHome.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        private readonly AdvertService _advertService;
        private readonly IHubContext<PerformerSelectionHub> _hub;
        public AdvertsController(AdvertService advertService, IHubContext<PerformerSelectionHub> hub)
        {
            _advertService = advertService;
            _hub = hub;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertDTO>>> GetAdverts([FromQuery] AdvertsParameters parameters)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            Tuple<IEnumerable<AdvertDTO>, int> advertsAndCount = _advertService.getAdverts(userId, parameters);
            Response.Headers.Add("X-Pagination-Total-Count", JsonConvert.SerializeObject(advertsAndCount.Item2));
            return Ok(advertsAndCount.Item1);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertDTO>> Get(int id)
        {
            return Ok(_advertService.getAdvertById(id));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] AdvertDTO advertToAdd, IFormFile petPhoto)
        {
            var filePath = Path.Combine(Environment.CurrentDirectory,"wwwroot","images", petPhoto.FileName);
            using (var stream = System.IO.File.Create(filePath))
            {
                await petPhoto.CopyToAsync(stream);
            }
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            Tuple<IEnumerable<string>, AdvertDTO> possiblePerformers = await _advertService.addAdvert(advertToAdd,userId, petPhoto.FileName);
            await _hub.Clients.Users(possiblePerformers.Item1).SendAsync("Send", possiblePerformers.Item2); //make a method in hub
            return Ok(new {ids = possiblePerformers.Item1,dto =  possiblePerformers.Item2});
        }
        [HttpPut("finish/{advertId}")]
        public async Task<ActionResult> MarkAsFinished(int advertId)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _advertService.MarkAsFinished(advertId, userId);
            return Ok();
        }
        [HttpDelete("{advertId}")]
        public async Task<ActionResult> deleteAdvert(int advertId)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _advertService.deleteAdvert(advertId, userId);
            return Ok();
        }
    }
}
