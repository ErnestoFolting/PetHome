using Microsoft.AspNetCore.Mvc;
using backendPetHome.BLL.Services;
using backendPetHome.Controllers.Abstract;

namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    public class TimeExceptionsController : BaseController
    {
        private readonly TimeExceptionService _timeExceptionServise;
        public TimeExceptionsController(TimeExceptionService timeExceptionService)
        {
            _timeExceptionServise = timeExceptionService;
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] IEnumerable<DateTime> dates)
        {
            await _timeExceptionServise.addTimeExceptions(UserId, dates);
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete([FromBody] IEnumerable<DateTime> dates)
        {
            await _timeExceptionServise.deleteTimeExceptions(UserId, dates);
            return Ok();
        }
    }
}
