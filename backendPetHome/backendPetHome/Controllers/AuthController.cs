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
            SetTokens(tokens);
            return Ok(new { accessToken = new JwtSecurityTokenHandler().WriteToken(tokens.Item1), expirationDate = tokens.Item1.ValidTo });
        }
        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            Tuple<SecurityToken, RefreshToken> tokens = await _authService.Refresh(refreshToken);
            SetTokens(tokens);
            return Ok(new { accessToken = new JwtSecurityTokenHandler().WriteToken(tokens.Item1), expirationDate = tokens.Item1.ValidTo });
        }
        private void SetTokens(Tuple<SecurityToken, RefreshToken> tokens)
        {
            var accessOption = new CookieOptions
            {
                HttpOnly = true,
                Expires = tokens.Item1.ValidTo
            };
            var refreshOption = new CookieOptions
            {
                HttpOnly = true,
                Expires = tokens.Item2.expires
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var encrypterAccessToken = tokenHandler.WriteToken(tokens.Item1);
            Response.Cookies.Append("accessToken", encrypterAccessToken, accessOption);
            Response.Cookies.Append("refreshToken", tokens.Item2.token , refreshOption);
        }
    }
}
