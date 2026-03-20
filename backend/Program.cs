using backend.Models;
using backend.Services;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<ProductService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/products", (ProductService service) =>
{
    return service.GetAll();
});

app.MapGet("/products/{id}", (int id, ProductService service) =>
{
    var product = service.GetById(id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.MapPost("/products", (Product product, ProductService service) =>
{
    service.Add(product);
    return Results.Created($"/products/{product.Id}", product);
});

app.MapPut("/products/{id}", (int id, Product updatedProduct, ProductService service) =>
{
    var result = service.Update(id, updatedProduct);
    return result is not null ? Results.Ok(result) : Results.NotFound();
});

app.MapDelete("/products/{id}", (int id, ProductService service) =>
{
    var success = service.Delete(id);
    return success ? Results.NoContent() : Results.NotFound();
});

app.Run();
