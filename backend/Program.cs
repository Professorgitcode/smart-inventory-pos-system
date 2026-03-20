using backend.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// 👇 ADD YOUR CODE HERE
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

// 👆 END HERE

app.Run();

/*record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}*/
