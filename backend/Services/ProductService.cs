using backend.Models;
using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;
namespace backend.Services
{
    public class ProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAll()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product?> GetById(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> Add(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product?> Update(int id, Product updatedProduct)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return null;

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.StockQuantity = updatedProduct.StockQuantity;

            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}