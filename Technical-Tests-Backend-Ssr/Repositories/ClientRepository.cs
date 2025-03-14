using Technical_Tests_Backend_Ssr.Data;
using Technical_Tests_Backend_Ssr.Models;
using Microsoft.EntityFrameworkCore;

namespace Technical_Tests_Backend_Ssr.Repositories
{
    public class ClientRepository : IRepository<Client>
    {
        private readonly ApplicationDbContext _context;

        public ClientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Client>> GetAll() => await _context.Client.ToListAsync();

        public async Task<Client> GetById(int id) => await _context.Client.FindAsync(id);

        public async Task Add(Client entity)
        {
            _context.Client.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Client entity)
        {
            _context.Client.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Client entity)
        {
            if (entity != null)
            {
                _context.Client.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
