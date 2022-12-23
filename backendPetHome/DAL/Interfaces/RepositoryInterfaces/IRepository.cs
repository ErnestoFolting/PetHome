using backendPetHome.DAL.Entities.Abstract;

namespace backendPetHome.DAL.Interfaces.RepositoryInterfaces
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        Task<List<TEntity>> GetAll();

        Task<TEntity?> GetById(int id);

        Task Add(TEntity entity);

        Task Delete(TEntity entity);

        Task DeleteById(int id);

        Task Update(TEntity entity);
    }
}
