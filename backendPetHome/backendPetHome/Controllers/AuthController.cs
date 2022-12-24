using backendPetHome.BLL.DTOs.UserDTOs;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Entities;
using backendPetHome.Models;
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
        public async Task<IActionResult> Register([FromForm]UserRegisterDTO data, IFormFile userPhoto)
        {
            var filePath = Path.Combine(Environment.CurrentDirectory, "wwwroot", "images", userPhoto.FileName);
            using (var stream = System.IO.File.Create(filePath))
            {
                await userPhoto.CopyToAsync(stream);
            }
            await _authService.Register(data, userPhoto.FileName);
            return Ok(new Response { Status = "Success", Message = "User created!" });
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]UserLoginDTO creds)
        {
            Tuple<SecurityToken, RefreshToken> tokens = await _authService.Login(creds);
            SetTokens(tokens);
            string? userId = tokens.Item2.ownerId;
            return Ok(new { userId = userId });
        }
        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (refreshToken == null) return Forbid();
            Tuple<SecurityToken, RefreshToken> tokens = await _authService.Refresh(refreshToken);
            SetTokens(tokens);
            string? userId = tokens.Item2.ownerId;
            return Ok(new { userId = userId });
        }
        [HttpPost("logout")]
        public async Task<ActionResult<string>> Logout()
        {
            var cookieOption = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now,
                SameSite = SameSiteMode.None,
                Secure = true
            };
            Response.Cookies.Append("accessToken", "", cookieOption);
            Response.Cookies.Append("refreshToken", "", cookieOption);
            return Ok(new Response{Status = "200", Message = "Logged out"});
        }
        private void SetTokens(Tuple<SecurityToken, RefreshToken> tokens)
        {
            var accessOption = new CookieOptions
            {
                HttpOnly = true,
                Expires = tokens.Item1.ValidTo,
                SameSite = SameSiteMode.None,
                Secure = true
            };
            var refreshOption = new CookieOptions
            {
                HttpOnly = true,
                Expires = tokens.Item2.expires,
                SameSite = SameSiteMode.None,
                Secure = true
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var encrypterAccessToken = tokenHandler.WriteToken(tokens.Item1);
            Response.Cookies.Append("accessToken", encrypterAccessToken, accessOption);
            Response.Cookies.Append("refreshToken", tokens.Item2.token , refreshOption);
        }
    }
}
