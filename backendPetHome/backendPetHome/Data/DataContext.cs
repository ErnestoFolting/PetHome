using backendPetHome.Controllers.Models;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> users { get; set; }
    }
}
