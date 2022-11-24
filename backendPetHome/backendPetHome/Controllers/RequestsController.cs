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
        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmRequest(int id)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _requestService.confirmRequest(id,userId);
            return Ok();
        }
        [HttpPut("reject/{id}")]
        public async Task<IActionResult> Reject(int id)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _requestService.rejectRequest(id, userId);
            return Ok();
        }
        [HttpPut("apply/{id}")]
        public async Task<IActionResult> applyGeneratedRequest(int id)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _requestService.applyGeneratedRequest(id, userId);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteRequest(int id)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _requestService.deleteRequest(id, userId);
            return Ok();
        }
    }
}
