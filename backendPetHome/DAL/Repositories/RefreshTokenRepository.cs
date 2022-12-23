using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly DataContext _context;
        public RefreshTokenRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Add(RefreshToken tokenToAdd)
        {
            await _context.Set<RefreshToken>().AddAsync(tokenToAdd);
        }

        public Task<RefreshToken?> GetByToken(string? token)
        {
            return Task.FromResult(_context.Set<RefreshToken>().FirstOrDefault(el => el.token == token));
        }
        public async Task Update(RefreshToken tokenToUpdate)
        {
            _context.Set<RefreshToken>().Attach(tokenToUpdate);
            _context.Entry(tokenToUpdate).State = EntityState.Modified;
        }
    }
}
