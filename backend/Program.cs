using backend.Data;
using backend.Models;
using backend.Services;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddOpenApi();
builder.Services.AddScoped<ProductService>();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=inventory.db"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/products", async ([FromServices] ProductService service) =>
{
    return await service.GetAll();
});

app.MapGet("/products/{id}", async ([FromServices] ProductService service, int id) =>
{
    var product = await service.GetById(id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.MapPost("/products", async (Product product, [FromServices] ProductService service) =>
{
    // Validation
    if (string.IsNullOrWhiteSpace(product.Name))
        return Results.BadRequest("Product name is required");

    if (product.Price <= 0)
        return Results.BadRequest("Price must be greater than 0");

    if (product.Stock < 0)
        return Results.BadRequest("Stock cannot be negative");

    // Check duplicate ID
    var products = await service.GetAll();
    var existing = products.FirstOrDefault(p => p.Id == product.Id);

    if (existing != null)
        return Results.BadRequest("Product with this ID already exists");

    await service.Add(product);

    return Results.Created($"/products/{product.Id}", product);
});

app.MapPut("/products/{id}", async (int id, Product updatedProduct, [FromServices] ProductService service) =>
{
    var result = await service.Update(id, updatedProduct);
    return result is not null ? Results.Ok(result) : Results.NotFound();
});

app.MapDelete("/products/{id}", async (int id, [FromServices] ProductService service) =>
{
    var success = await service.Delete(id);
    return success ? Results.NoContent() : Results.NotFound();
});
app.UseCors("AllowReact");
app.Run();
