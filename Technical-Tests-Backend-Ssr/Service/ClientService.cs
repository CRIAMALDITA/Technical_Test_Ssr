using Technical_Tests_Backend_Ssr.Models;
using Technical_Tests_Backend_Ssr.Repositories;

namespace BackendABM.Services
{
    public class ClientService
    {
        private readonly ClientRepository _repository;

        public ClientService(ClientRepository repository)
        {
            _repository = repository;
        }



        public async Task<List<Client>> GetAllClients() => await _repository.GetAll();
        public async Task<Client> GetClientById(int id) => await _repository.GetById(id);
        public async Task AddUClient(Client client) => await _repository.Add(client);
        public async Task UpdateClient(Client client) => await _repository.Update(client);
        public async Task DeleteClient(Client client) => await _repository.Delete(client);
    }
}