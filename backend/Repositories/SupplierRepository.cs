using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly AppDbContext _context;

        public SupplierRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Supplier>> GetAllAsync()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier?> GetByIdAsync(int id)
        {
            return await _context.Suppliers
                .FirstOrDefaultAsync(x => x.SupplierId == id);
        }

        public async Task<Supplier> AddAsync(Supplier supplier)
        {
            _context.Suppliers.Add(supplier);

            await _context.SaveChangesAsync();

            return supplier;
        }

        public async Task DeleteAsync(Supplier supplier)
        {
            _context.Suppliers.Remove(supplier);

            await _context.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}