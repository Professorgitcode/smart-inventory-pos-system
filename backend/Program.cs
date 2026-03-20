using backend.Models;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var products = new List<Product>
{
    new Product { Id = 1, Name = "Phone", Price = 150, Stock = 10 },
    new Product { Id = 2, Name = "Charger", Price = 10, Stock = 50 }
};

app.MapGet("/products", () => products);

app.MapPost("/products", (Product product) =>
{
    products.Add(product);
    return Results.Created($"/products/{product.Id}", product);
});

app.MapGet("/products/{id}", (int id) =>
{
    var product = products.FirstOrDefault(p => p.Id == id);

    return product is not null 
        ? Results.Ok(product) 
        : Results.NotFound();
});

app.MapPut("/products/{id}", (int id, Product updatedProduct) =>
{
    var product = products.FirstOrDefault(p => p.Id == id);

    if (product is null)
        return Results.NotFound();

    product.Name = updatedProduct.Name;
    product.Price = updatedProduct.Price;
    product.Stock = updatedProduct.Stock;

    return Results.Ok(product);
});

app.MapDelete("/products/{id}", (int id) =>
{
    var product = products.FirstOrDefault(p => p.Id == id);

    if (product is null)
        return Results.NotFound();

    products.Remove(product);

    return Results.NoContent();
});
app.Run();
