using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTOs;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _service;

        public ProductsController(ProductService service)
        {
            _service = service;
        }

        // ================= GET =================
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _service.GetAll();

            var result = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                StockQuantity = p.StockQuantity
            });

            return Ok(result);
        }

        // ================= POST =================
        [HttpPost]
        public async Task<IActionResult> AddProduct(ProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                StockQuantity = dto.StockQuantity
            };

            var created = await _service.Add(product);

            return Ok(created);
        }

        // ================= PUT =================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDto dto)
        {
            var updatedProduct = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                StockQuantity = dto.StockQuantity
            };

            var result = await _service.Update(id, updatedProduct);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // ================= DELETE =================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var success = await _service.Delete(id);

            if (!success)
                return NotFound();

            return Ok();
        }
    }
}