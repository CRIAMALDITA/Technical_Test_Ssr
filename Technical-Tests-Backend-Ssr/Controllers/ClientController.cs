using BackendABM.Services;
using Microsoft.AspNetCore.Mvc;
using Technical_Tests_Backend_Ssr.Models;
using Technical_Tests_Backend_Ssr.Models.DTOs;
using AutoMapper;
using FluentValidation;

namespace Technical_Tests_Backend_Ssr.Controllers
{
    [ApiController]
    [Route("api/Client")]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _service;
        private readonly IMapper _mapper;
        private readonly IValidator<ClientDTO> _validator;

        public ClientController(ClientService service, IMapper mapper, IValidator<ClientDTO> validator)
        {
            _service = service;
            _mapper = mapper;
            _validator = validator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> GetEntities()
        {
            var clients = await _service.GetAllClients();
            return Ok(_mapper.Map<IEnumerable<ClientDTO>>(clients));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDTO>> GetEntity(int id)
        {
            var client = await _service.GetClientById(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ClientDTO>(client));
        }

        [HttpPost]
        public async Task<ActionResult<ClientDTO>> CreateEntity([FromBody] ClientDTO clientDto)
        {
            var validationResult = await _validator.ValidateAsync(clientDto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            var clientEntity = _mapper.Map<Client>(clientDto);
            await _service.AddUClient(clientEntity);

            var createdClientDto = _mapper.Map<ClientDTO>(clientEntity);
            return CreatedAtAction(nameof(GetEntity), new { id = createdClientDto.IdClient }, createdClientDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEntity(int id, [FromBody] ClientDTO clientDto)
        {
            if (id != clientDto.IdClient || clientDto.IdClient == -1)
            {
                return BadRequest();
            }

            var existingClient = await _service.GetClientById(clientDto.IdClient);
            if (existingClient == null)
            {
                return NotFound();
            }

            var validationResult = await _validator.ValidateAsync(clientDto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            _mapper.Map(clientDto, existingClient);
            await _service.UpdateClient(existingClient);

            return Ok(_mapper.Map<ClientDTO>(existingClient));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntity(int id, [FromQuery] bool isPermanentDelete = false)
        {
            var client = await _service.GetClientById(id);
            if (client == null)
            {
                return NotFound();
            }
            if (isPermanentDelete)
            {
                await _service.DeleteClient(client);
                return NoContent();
            }
            if (!client.isDeleted)
            {
                client.isDeleted = true;
                await _service.UpdateClient(client);
            }
            return Ok(_mapper.Map<ClientDTO>(client));
        }
    }
}