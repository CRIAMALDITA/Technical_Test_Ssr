using Technical_Tests_Backend_Ssr.Models;
using Technical_Tests_Backend_Ssr.Repositories;

namespace BackendABM.Services
{
    public class UserService
    {
        private readonly UserRepository _repository;

        public UserService(UserRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<User>> GetAllUsers() => await _repository.GetAll();
        public async Task<User> GetUserById(int id) => await _repository.GetById(id);
        public async Task AddUser(User user) => await _repository.Add(user);
        public async Task UpdateUser(User user) => await _repository.Update(user);
        public async Task DeleteUser(User user) => await _repository.Delete(user);
        public async Task<User> GetUserByName(string name) 
        {
            var result = await _repository.GetAll();
            return result.ToList().Where(x => x.UserName == name).First();
        }
    }
}