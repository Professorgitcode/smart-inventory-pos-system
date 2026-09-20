using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public static class AuthSeeder
{
    // ====================================
    // SEED DEVELOPMENT USERS
    // ====================================

    public static async Task SeedAsync(
        AppDbContext context,
        PasswordHasher<User> passwordHasher,
        IConfiguration configuration)
    {
        // ====================================
        // READ DEVELOPMENT CREDENTIALS
        // ====================================

        var adminPassword =
            configuration["SeedUsers:AdminPassword"];

        var userPassword =
            configuration["SeedUsers:UserPassword"];

        // ====================================
        // VALIDATE CONFIGURATION
        // ====================================

        if (string.IsNullOrWhiteSpace(adminPassword))
        {
            throw new InvalidOperationException(
                "Development admin seed password is not configured."
            );
        }

        if (string.IsNullOrWhiteSpace(userPassword))
        {
            throw new InvalidOperationException(
                "Development user seed password is not configured."
            );
        }

        // ====================================
        // SEED ADMIN
        // ====================================

        var adminExists =
            await context.Users
                .AnyAsync(user => user.Username == "admin");

        if (!adminExists)
        {
            var admin = new User
            {
                Username = "admin",
                FirstName = "System",
                LastName = "Administrator",
                Email = "admin@localhost",
                Role = "Admin",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            admin.PasswordHash =
                passwordHasher.HashPassword(
                    admin,
                    adminPassword
                );

            await context.Users.AddAsync(admin);
        }

        // ====================================
        // SEED STANDARD USER
        // ====================================

        var userExists =
            await context.Users
                .AnyAsync(user => user.Username == "testuser");

        if (!userExists)
        {
            var user = new User
            {
                Username = "testuser",
                FirstName = "Test",
                LastName = "User",
                Email = "testuser@localhost",
                Role = "User",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            user.PasswordHash =
                passwordHasher.HashPassword(
                    user,
                    userPassword
                );

            await context.Users.AddAsync(user);
        }

        // ====================================
        // SAVE CHANGES
        // ====================================

        await context.SaveChangesAsync();
    }
}