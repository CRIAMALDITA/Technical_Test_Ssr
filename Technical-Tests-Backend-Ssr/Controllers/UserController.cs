using Technical_Tests_Backend_Ssr.Repositories;
using BCrypt.Net;
using AutoMapper;
using BackendABM.Services;
using Microsoft.AspNetCore.Mvc;
using Technical_Tests_Backend_Ssr.Models;
using Technical_Tests_Backend_Ssr.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Technical_Tests_Backend_Ssr.Data;

namespace Technical_Tests_Backend_Ssr.Controllers
{
    [ApiController]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly UserService service;
        private readonly IMapper _mapper;

        public UserController(UserService service, IMapper mapper)
        {
            this.service = service;
            this._mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetEntitys()
        {
            var users = await service.GetAllUsers();
            return Ok(_mapper.Map<IEnumerable<UserDTO>>(users));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetEntity(int id)
        {
            var user = await service.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<UserDTO>(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateEntity([FromBody] UserDTO userDto)
        {
            var userEntity = _mapper.Map<User>(userDto);
            await service.AddUser(userEntity);

            var createdUserDto = _mapper.Map<UserDTO>(userEntity);
            return CreatedAtAction(nameof(GetEntity), new { id = createdUserDto.IdUser }, createdUserDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEntity(int id, [FromBody] UserDTO userDto)
        {
            if (id != userDto.IdUser || userDto.IdUser == -1)
                return BadRequest();

            var existingUser = await service.GetUserById(id);
            if (existingUser == null)
                return NotFound();

            var userEntity = _mapper.Map<User>(userDto);
            await service.UpdateUser(userEntity);

            return Ok(_mapper.Map<UserDTO>(userEntity));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntity(int id)
        {
            var user = await service.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            await service.DeleteUser(user);
            return NoContent();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO userLoginDTO)
        {
            var user = await service.GetUserByName(userLoginDTO.UserName);

            if (user == null || !BCrypt.Net.BCrypt.Verify(userLoginDTO.Password, user.UserPasswordHash))
            {
                return Unauthorized("Incorrect password.");
            }

            return Ok(new { Message = "Successful Login", User = _mapper.Map<UserDTO>(user) });
        }
    }
}
