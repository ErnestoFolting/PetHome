using backendPetHome.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {

        private readonly RequestService _requestService;

        public RequestsController(RequestService requestService)
        {
            _requestService = requestService;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] int advertId)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _requestService.addRequest(userId, advertId);
            return Ok();
        }
    }
}
