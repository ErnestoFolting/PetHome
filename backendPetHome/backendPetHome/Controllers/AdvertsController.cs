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
            //string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            string userId = "2165b137-1f4f-42fe-9650-178455d7df41";
            return Ok(_advertService.getAdverts(userId));
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
            await _advertService.addAdvert(advertToAdd,userId);
            await _hub.Clients.All.SendAsync("Send", "check");
            return Ok();
        }
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
