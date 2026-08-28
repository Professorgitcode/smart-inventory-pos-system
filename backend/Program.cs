using backend.Data;
using backend.Services;
using backend.Middleware;
using backend.Repositories;
using QuestPDF.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

QuestPDF.Settings.License = LicenseType.Community;
builder.Services.AddOpenApi();
builder.Services.AddScoped<SupplierService>();
builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();
builder.Services.AddScoped<SupplierIntelligenceService>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<InventoryInsightService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<ForecastService>();
builder.Services.AddScoped<ProductForecastService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<ReportExportService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=inventory.db"));
builder.Services.AddControllers();
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
app.UseMiddleware<ExceptionMiddleware>();
app.MapControllers();

app.UseCors("AllowReact");
app.Run();
