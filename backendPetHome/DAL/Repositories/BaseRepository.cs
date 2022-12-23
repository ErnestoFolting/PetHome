using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities.Abstract;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class BaseRepository<TEntity>:IRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DataContext _context;
        public BaseRepository(DataContext context)
        {
            _context = context;
        }
        public Task<List<TEntity>> GetAll()
        {
            return _context.Set<TEntity>().ToListAsync();
        }

        public Task<TEntity?> GetById(int id)
        {
            return _context.Set<TEntity>().FindAsync(id).AsTask();
        }

        public async Task Add(TEntity entity)
        {
            await _context.Set<TEntity>().AddAsync(entity);
        }

        public async Task Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public async Task DeleteById(int id)
        {
            TEntity? entity = await GetById(id);
            await Delete(entity);
        }

        public async Task Update(TEntity entity)
        {
            _context.Set<TEntity>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}
