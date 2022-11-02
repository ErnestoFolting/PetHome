using backendPetHome.BLL.Models;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

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
            var userExisted = await _userManager.FindByNameAsync(data.username);
            if (userExisted != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
            }
            User user = new()
            {
                Email = data.email,
                UserName = data.username,
                SecurityStamp = Guid.NewGuid().ToString(),
                surname = data.surname,
            };
            var result = await _userManager.CreateAsync(user,data.password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed!" });
            }
            return Ok(new Response { Status = "Success", Message = "User created!" });
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginCreds creds)
        {
            var user = await _userManager.FindByNameAsync(creds.username);
            if(user != null && await _userManager.CheckPasswordAsync(user,creds.password))
            {
                var token = GetSecurityToken(user);
                var resfreshToken = GetRefreshToken(user);
                _dbContext.refreshTokens.Add(resfreshToken);
                await _dbContext.SaveChangesAsync();
                SetRefreshToken(resfreshToken);
                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), expiration = token.ValidTo });
            }
            return Unauthorized();
        }
        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            RefreshToken? refreshTokenInDb = _dbContext.refreshTokens.FirstOrDefault(t => t.token == refreshToken);
            if(refreshTokenInDb == null)
            {
                return Unauthorized("Invalid token.");
            }
            else
            {
                if(refreshTokenInDb.isNotActual == true)
                {
                    return Unauthorized("Token is not actual.");
                }
                else
                {
                    if(refreshTokenInDb.expires < DateTime.Now)
                    {
                        return Unauthorized("Token is expired.");
                    }       
                    refreshTokenInDb.isNotActual = true;
                    _dbContext.Update(refreshTokenInDb);
                    var user = await _userManager.FindByIdAsync(refreshTokenInDb.ownerId);
                    var token = GetSecurityToken(user);
                    var newRefreshToken = GetRefreshToken(user);
                    _dbContext.refreshTokens.Add(newRefreshToken);
                    await _dbContext.SaveChangesAsync();
                    SetRefreshToken(newRefreshToken);
                    return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), expiration = token.ValidTo });
                }
            }
        }
        private SecurityToken GetSecurityToken(User user)
        {
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier,user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                };
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(60),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            return token;
        }
        private RefreshToken GetRefreshToken(User user)
        {
            RefreshToken refreshToken = new()
            {
                token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                expires = DateTime.Now.AddDays(7),
                created = DateTime.Now,
                ownerId = user.Id
            };
            return refreshToken;
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
