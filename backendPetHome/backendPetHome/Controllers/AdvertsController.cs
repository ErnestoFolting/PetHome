using backendPetHome.Attributes;
using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.Services;
using backendPetHome.Controllers.Abstract;
using backendPetHome.DAL.Specifications.QueryParameters;
using backendPetHome.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    public class AdvertsController : BaseController
    {
        private readonly AdvertService _advertService;
        private readonly IHubContext<PerformerSelectionHub> _hub;
        public AdvertsController(AdvertService advertService, IHubContext<PerformerSelectionHub> hub)
        {
            _advertService = advertService;
            _hub = hub;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertDTO>>> GetAdverts([FromQuery] QueryStringParameters parameters)
        {
            var advertsAndCount = await _advertService.getAdverts(parameters);
            Response.Headers.Add("X-Pagination-Total-Count", JsonConvert.SerializeObject(advertsAndCount.totalCount));
            return Ok(advertsAndCount.fitAdvertsDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertDTO>> Get(int id)
        {
            return Ok(await _advertService.getAdvertById(id));
        }

        [UserId]
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] AdvertCreateRedoDTO advertToAdd, IFormFile petPhoto)
        {
            Tuple<IEnumerable<string>, AdvertDTO> possiblePerformers = await _advertService.addAdvert(advertToAdd,UserId,petPhoto);
            await _hub.Clients.Users(possiblePerformers.Item1).SendAsync("Send", possiblePerformers.Item2); //make a method in hub
            return Ok(new {ids = possiblePerformers.Item1,dto =  possiblePerformers.Item2});
        }

        [UserId]
        [HttpPut("finish/{advertId}")]
        public async Task<ActionResult> MarkAsFinished(int advertId)
        {
            await _advertService.MarkAsFinished(advertId, UserId);
            return Ok();
        }

        [UserId]
        [HttpDelete("{advertId}")]
        public async Task<ActionResult> deleteAdvert(int advertId)
        {
            await _advertService.deleteAdvert(advertId, UserId);
            return Ok();
        }
    }
}
