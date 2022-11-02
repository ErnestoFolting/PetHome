using BAL.DTOs;
using BAL.Services;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace backendPetHome.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        private readonly AdvertService _advertService;
        public AdvertsController(AdvertService advertService)
        {
            _advertService = advertService;
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Advert>>> Get()
        {
            string? userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            return Ok(_advertService.getAdverts(userId));
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AdvertDTO advertToAdd)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await _advertService.addAdvert(advertToAdd,userId);
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
