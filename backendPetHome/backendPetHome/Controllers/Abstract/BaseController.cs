using backendPetHome.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backendPetHome.Controllers.Abstract
{
    [ApiController]
    [Authorize]
    [UserId] 
    public abstract class BaseController : ControllerBase
    {
        public string UserId { get; set; }
    }
}
