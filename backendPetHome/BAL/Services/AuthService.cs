using backendPetHome.BLL.Models;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backendPetHome.BLL.Services
{
    public class AuthService
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(DataContext dataContext, UserManager<User> userManager, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _userManager = userManager;
            _configuration = configuration;
        }
        public async Task Register(RegisterData data)
        {
            var userExisted = await _userManager.FindByNameAsync(data.username);
            if (userExisted != null)
            {
                throw new ArgumentException("The user with that userName already existing.");
            }
            User user = new()
            {
                Email = data.email,
                UserName = data.username,
                SecurityStamp = Guid.NewGuid().ToString(),
                surname = data.surname,
                name = data.name,
                PhoneNumber = data.phone,
                sex = data.sex,
                locationLat = data.locationLat,
                locationLng = data.locationLng
            };
            var result = await _userManager.CreateAsync(user, data.password);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Can not add a new user.");
            }
        }

        public async Task<Tuple<SecurityToken, RefreshToken>> Login(LoginCreds creds)
        {
            var user = await _userManager.FindByNameAsync(creds.username);
            if (user != null && await _userManager.CheckPasswordAsync(user, creds.password))
            {
                var newTokens = await getTokens(user);
                return newTokens;
            }
            throw new ArgumentException("Invalid credentials.");
        }

        public async Task<Tuple<SecurityToken, RefreshToken>> Refresh(string? refreshToken)
        {
            RefreshToken? refreshTokenInDb = _dataContext.refreshTokens.FirstOrDefault(t => t.token == refreshToken);
            if (refreshTokenInDb == null)
            {
                throw new KeyNotFoundException("The refresh token does not exist.");
            }
            else if (refreshTokenInDb?.isNotActual == true || refreshTokenInDb?.expires < DateTime.Now)
            {
                throw new ArgumentException("The refresh token is not actual.");
            }
            else if (validateToken(refreshToken))
            {
                refreshTokenInDb.isNotActual = true;
                _dataContext.Update(refreshTokenInDb);
                var user = await _userManager.FindByIdAsync(refreshTokenInDb.ownerId);
                var newTokens = await getTokens(user);
                return newTokens;
            }
            else
            {
                throw new ArgumentException("The refresh token is not valid.");
            }
        }
        private bool validateToken(string? token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = _configuration["JWT:ValidIssuer"],
                    ValidAudience = _configuration["JWT:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"])),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private async Task<Tuple<SecurityToken, RefreshToken>> getTokens(User user)
        {
            var securityToken = GetSecurityToken(user, DateTime.Now.AddMinutes(15));
            var newRefreshToken = GetRefreshToken(user);
            _dataContext.refreshTokens.Add(newRefreshToken);
            await _dataContext.SaveChangesAsync();
            Tuple<SecurityToken, RefreshToken> tokens = new(securityToken, newRefreshToken);
            return tokens;
        }
        private RefreshToken GetRefreshToken(User user)
        {
            var expireTime = DateTime.Now.AddDays(7);
            var refreshJWT = GetSecurityToken(user, expireTime);
            var tokenHandler = new JwtSecurityTokenHandler();
            var encryptedRefreshToken = tokenHandler.WriteToken(refreshJWT);
            RefreshToken refreshToken = new()
            {
                token = encryptedRefreshToken,
                expires = expireTime,
                created = DateTime.Now,
                ownerId = user.Id
            };
            return refreshToken;
        }
        private SecurityToken GetSecurityToken(User user, DateTime expireTime)
        {
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier,user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: expireTime,
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            return token;
        }
    }
}
