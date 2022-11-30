using backendPetHome.BLL.DTOs;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Models;
using backendPetHome.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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
        public async Task<ActionResult<IEnumerable<Advert>>> Get()
        {
            return Ok(_advertService.getAllAdverts());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Advert>> Get(int id)
        {
            return Ok(_advertService.getAdvertById(id));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AdvertDTO advertToAdd)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            Tuple<IEnumerable<string>,AdvertDTO> possiblePerformers = await _advertService.addAdvert(advertToAdd,userId);
            await _hub.Clients.Users(possiblePerformers.Item1).SendAsync("Send", possiblePerformers.Item2);
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
