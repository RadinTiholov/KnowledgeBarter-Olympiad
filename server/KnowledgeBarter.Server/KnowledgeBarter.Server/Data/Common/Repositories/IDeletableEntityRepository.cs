namespace KnowledgeBarter.Server.Data.Common.Repositories
{
    using KnowledgeBarter.Server.Data.Common.Models;
    using System.Linq;

    public interface IDeletableEntityRepository<TEntity> : IRepository<TEntity>
        where TEntity : class, IDeletableEntity
    {
        IQueryable<TEntity> AllWithDeleted();

        IQueryable<TEntity> AllAsNoTrackingWithDeleted();

        void HardDelete(TEntity entity);

        void Undelete(TEntity entity);
    }
}
