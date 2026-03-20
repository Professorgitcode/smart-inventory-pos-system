using backend.Models;

namespace backend.Services
{
    public class ProductService
    {
        private readonly List<Product> _products;

        public ProductService()
        {
            _products = new List<Product>
            {
                new Product { Id = 1, Name = "Phone", Price = 150, Stock = 10 },
                new Product { Id = 2, Name = "Charger", Price = 10, Stock = 50 }
            };
        }

        public List<Product> GetAll() => _products;

        public Product? GetById(int id) =>
            _products.FirstOrDefault(p => p.Id == id);

        public Product Add(Product product)
        {
            _products.Add(product);
            return product;
        }

        public Product? Update(int id, Product updatedProduct)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);

            if (product == null) return null;

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Stock = updatedProduct.Stock;

            return product;
        }

        public bool Delete(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);

            if (product == null) return false;

            _products.Remove(product);
            return true;
        }
    }
}