using Microsoft.AspNetCore.Mvc;
using backendPetHome.BLL.Services;
using System.Security.Claims;

namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeExceptionsController : ControllerBase
    {
        private readonly TimeExceptionService _timeExceptionServise;
        public TimeExceptionsController(TimeExceptionService timeExceptionService)
        {
            _timeExceptionServise = timeExceptionService;
        }

        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}


        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpPost]
        public async Task<ActionResult<IEnumerable<DateTime>>> Post([FromBody] IEnumerable<DateTime> dates)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _timeExceptionServise.addTimeExceptions(userId, dates);
            return Ok(dates);
        }


        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
