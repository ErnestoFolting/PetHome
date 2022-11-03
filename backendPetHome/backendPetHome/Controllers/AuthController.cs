using backendPetHome.BLL.Models;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Models;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;


namespace backendPetHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
             _authService = authService;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterData data)
        {
            await _authService.Register(data);
            return Ok(new Response { Status = "Success", Message = "User created!" });
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginCreds creds)
        {
            Tuple<SecurityToken, RefreshToken> tokens = await _authService.Login(creds);
            SetRefreshToken(tokens.Item2);
            return Ok(new { accessToken = new JwtSecurityTokenHandler().WriteToken(tokens.Item1), expirationDate = tokens.Item1.ValidTo });
        }
        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            Tuple<SecurityToken, RefreshToken> tokens = await _authService.Refresh(refreshToken);
            SetRefreshToken(tokens.Item2);
            return Ok(new { accessToken = new JwtSecurityTokenHandler().WriteToken(tokens.Item1), expirationDate = tokens.Item1.ValidTo });
        }
        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.token, cookieOptions);
        }
    }
}
