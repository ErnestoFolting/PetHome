using backendPetHome.API.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backendPetHome.API.Controllers.Abstract
{
    [ApiController]
    [Authorize(Roles = "User")]
    [UserId]
    public abstract class BaseController : ControllerBase
    {
        public string UserId { get; set; }
    }
}
