using Microsoft.AspNetCore.Mvc;
using Technical_Tests_Backend_Ssr.Services;
using Technical_Tests_Backend_Ssr.Models.DTOs;

namespace Technical_Tests_Backend_Ssr.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDTO loginDTO)
        {
            var token = _authService.Authenticate(loginDTO);
            if (token == null)
                return Unauthorized(new { message = "Credenciales inválidas" });

            return Ok(new { token });
        }
    }
}