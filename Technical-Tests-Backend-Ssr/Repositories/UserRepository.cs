using Technical_Tests_Backend_Ssr.Data;
using Technical_Tests_Backend_Ssr.Models;
using Microsoft.EntityFrameworkCore;

namespace Technical_Tests_Backend_Ssr.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAll() => await _context.User.ToListAsync();

        public async Task<User> GetById(int id) => await _context.User.FindAsync(id);

        public async Task Add(User entity)
        {
            _context.User.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Update(User entity)
        {
            _context.User.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(User entity)
        {
            if (entity != null)
            {
                _context.User.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
