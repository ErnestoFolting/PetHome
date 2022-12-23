using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using backendPetHome.DAL.Specifications;
using backendPetHome.DAL.Specifications.UserSpecifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Delete(User useToDelete)
        {
            _context.Set<User>().Remove(useToDelete);
        }

        public Task<User?> GetById(string id)
        {
            return _context.Set<User>().FindAsync(id).AsTask();
        }

        public Task<User?> GetByIdIncludesTimeException(string id)
        {
            return ApplySpecification(new UserByIdWithTimeExceptionSpecification(id)).SingleOrDefaultAsync();
        }

        public async Task Update(User userToUpdate)
        {
            _context.Set<User>().Attach(userToUpdate);
            _context.Entry(userToUpdate).State = EntityState.Modified;
        }

        private IQueryable<User> ApplySpecification(Specification<User> specification)
        {
            return SpecificationEvaluator.getQuery(_context.Set<User>(), specification);
        }
    }
}
