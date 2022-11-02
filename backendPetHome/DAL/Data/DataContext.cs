using backendPetHome.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace backendPetHome.DAL.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> users { get; set; }
        public DbSet<Advert> adverts { get; set; }
        public DbSet<RefreshToken> refreshTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=localhost\\sqlexpress;database=testdb;trusted_connection=true");
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<Advert>()
                .HasOne(a => a.owner)
                .WithMany(u => u.postedAdverts)
                .HasForeignKey(a => a.ownerId);

            builder
                .Entity<Advert>()
                .HasOne(a => a.performer)
                .WithMany(u => u.performAtAdverts)
                .HasForeignKey(a => a.performerId);
            builder
                .Entity<Interval>()
                .HasOne(i => i.user)
                .WithMany(u => u.timeIntervals)
                .HasForeignKey(i => i.userId);
            builder
                .Entity<Request>()
                .HasOne(r => r.user)
                .WithMany(u => u.requests)
                .HasForeignKey(r => r.userId)
                .OnDelete(DeleteBehavior.NoAction);
            builder
                .Entity<Request>()
                .HasOne(r => r.advert)
                .WithMany(a => a.requests)
                .HasForeignKey(r => r.advertId);
            builder
                .Entity<RefreshToken>()
                .HasOne(r => r.owner)
                .WithMany(u => u.refreshTokens)
                .HasForeignKey(r => r.ownerId);

            base.OnModelCreating(builder);
        }
    }
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(@Directory.GetCurrentDirectory() + "/../backendPetHome/appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<DataContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            builder.UseSqlServer(connectionString);
            return new DataContext(builder.Options);
        }
    }
}
