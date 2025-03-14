using Microsoft.EntityFrameworkCore;
using Technical_Tests_Backend_Ssr.Models;

namespace Technical_Tests_Backend_Ssr.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Client> Client { get; set; }
        public DbSet<User> User { get; set; }
    }
}
