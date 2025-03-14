using Technical_Tests_Backend_Ssr.Data;
using Technical_Tests_Backend_Ssr.Models;

namespace Technical_Tests_Backend_Ssr.Repositories
{
    public interface IRepository<T> where T : class
    {

        public Task<List<T>> GetAll();

        public Task<T> GetById(int id);

        public Task Add(T entity);

        public Task Update(T entity);

        public Task Delete(T entity);
    }
}
