using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Technical_Tests_Backend_Ssr.Models;
using Technical_Tests_Backend_Ssr.Models.DTOs;
using Technical_Tests_Backend_Ssr.Data;

namespace Technical_Tests_Backend_Ssr.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public string Authenticate(UserLoginDTO loginDTO)
        {
            var user = _context.User.FirstOrDefault(u => u.UserName == loginDTO.UserName && u.UserPasswordHash == loginDTO.Password);
            if (user == null) return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["JwtSettings:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, user.UserPermission.ToString()),
                    new Claim("id", user.IdUser.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _config["JwtSettings:Issuer"],
                Audience = _config["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}