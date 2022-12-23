using backendPetHome.DAL.Data;
using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Interfaces.RepositoryInterfaces;
using backendPetHome.DAL.Specifications;
using backendPetHome.DAL.Specifications.RequestSpecifications;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.DAL.Repositories
{
    public class RequestRepository : IRequestRepository
    {
        private readonly DataContext _context;
        public RequestRepository(DataContext context)
        {
            _context = context;
        }

        public async Task Add(Request requestToAdd)
        {
            await _context.Set<Request>().AddAsync(requestToAdd);
        }

        public Task<List<Request>> GetCurrentAdvertNotCurrent(Request requestToConfirm)
        {
            return ApplySpecification(new RequestCurrentAdvertNotCurrentSpecification(requestToConfirm)).ToListAsync();
        }

        public async Task Delete(Request requestToRemove)
        {
            _context.Set<Request>().Remove(requestToRemove);
        }

        public Task<Request?> GetByIdIncludesAdvert(int id)
        {
            return ApplySpecification(new RequestByIdWithAdvertSpecification(id)).SingleOrDefaultAsync();
        }

        public Task<List<Request>> GetCurrentUserRequests(string userId)
        {
            return ApplySpecification(new RequestCurrentUserSpecification(userId)).ToListAsync();
        }
        private IQueryable<Request> ApplySpecification(Specification<Request> specification)
        {
            return SpecificationEvaluator.getQuery(_context.Set<Request>(), specification);
        }
    }
}
