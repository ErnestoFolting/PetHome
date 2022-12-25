using backendPetHome.BLL.Services;
using backendPetHome.Controllers.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    public class RequestsController : BaseController
    {

        private readonly RequestService _requestService;

        public RequestsController(RequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] int advertId)
        {
            await _requestService.addRequest(UserId, advertId, DAL.Enums.RequestStatusEnum.applied);
            return Ok();
        }

        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmRequest(int id)
        {
            await _requestService.confirmRequest(id, UserId);
            return Ok();
        }

        [HttpPut("reject/{id}")]
        public async Task<IActionResult> Reject(int id)
        {
            await _requestService.rejectRequest(id, UserId);
            return Ok();
        }

        [HttpPut("apply/{id}")]
        public async Task<IActionResult> applyGeneratedRequest(int id)
        {
            await _requestService.applyGeneratedRequest(id, UserId);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteRequest(int id)
        {
            await _requestService.deleteRequest(id, UserId);
            return Ok();
        }
    }
}
