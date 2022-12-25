using backendPetHome.Controllers.Abstract;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace backendPetHome.Attributes
{
    public class UserIdAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context) { }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var c = context.Controller as BaseController;
            c.UserId = c.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                        