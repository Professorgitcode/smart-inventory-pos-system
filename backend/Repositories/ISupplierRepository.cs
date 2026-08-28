using backend.Models;

namespace backend.Repositories
{
    public interface ISupplierRepository
    {
        Task<List<Supplier>> GetAllAsync();

        Task<Supplier?> GetByIdAsync(int id);

        Task<Supplier> AddAsync(Supplier supplier);

        Task DeleteAsync(Supplier supplier);

        Task SaveAsync();
    }
}