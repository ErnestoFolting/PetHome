﻿using Microsoft.AspNetCore.Mvc;
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
        [HttpPost]
        public async Task<ActionResult<IEnumerable<DateTime>>> Post([FromBody] IEnumerable<DateTime> dates)
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _timeExceptionServise.addTimeExceptions(userId, dates);
            return Ok(dates);
        }
    }
}