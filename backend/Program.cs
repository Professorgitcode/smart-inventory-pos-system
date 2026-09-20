using backend.Data;
using backend.Models;
using backend.Services;
using backend.Middleware;
using backend.Repositories;
using QuestPDF.Infrastructure;
using backend.Repositories.Auth;
using backend.Services.Auth;
using Microsoft.AspNetCore.Identity;
using backend.Services.Reports;
using backend.Services.Reports.Exports.Csv;
using backend.Services.Reports.Exports.Docx;
using backend.Services.Reports.Exports.Excel;
using backend.Services.Reports.Exports.Pdf;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ====================================
// JWT AUTHENTICATION CONFIGURATION
// ====================================

var jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException(
        "JWT signing key is not configured."
    );
}

var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            ),

            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,

            ValidateAudience = true,
            ValidAudience = jwtAudience,

            ValidateLifetime = true,

            ClockSkew = TimeSpan.FromMinutes(1)
        };
    });

// ====================================
// AUTHORIZATION
// ====================================

builder.Services.AddAuthorization();

QuestPDF.Settings.License = LicenseType.Community;
builder.Services.AddOpenApi();
builder.Services.AddScoped<SupplierService>();
builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<PasswordHasher<User>>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<SupplierIntelligenceService>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<SalesReportPdfExporter>();
builder.Services.AddScoped<SalesReportExcelExporter>();
builder.Services.AddScoped<SalesReportCsvExporter>();
builder.Services.AddScoped<SalesReportDocxExporter>();
builder.Services.AddScoped<InventoryInsightService>();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<ForecastService>();
builder.Services.AddScoped<ProductForecastService>();
builder.Services.AddScoped<ProductService>();
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



// ====================================
// DEVELOPMENT USER SEEDING
// ====================================

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();

    var services = scope.ServiceProvider;

    var context =
        services.GetRequiredService<AppDbContext>();

    var passwordHasher =
        services.GetRequiredService<PasswordHasher<User>>();

    await AuthSeeder.SeedAsync(
        context,
        passwordHasher,
        builder.Configuration
    );

    app.MapOpenApi();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("AllowReact");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
