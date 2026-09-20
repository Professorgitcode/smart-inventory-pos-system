using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Auth;

public class UserRepository : IUserRepository
{
    // ====================================
    // DATABASE CONTEXT
    // ====================================

    private readonly AppDbContext _context;

    // ====================================
    // CONSTRUCTOR
    // ====================================

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    // ====================================
    // FIND USER BY USERNAME
    // ====================================

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                user => user.Username == username
            );
    }

    // ====================================
    // FIND USER BY ID
    // ====================================

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(
                user => user.Id == id
            );
    }

    // ====================================
    // CREATE USER
    // ====================================

    public async Task<User> CreateAsync(User user)
    {
        await _context.Users.AddAsync(user);

        return user;
    }

    // ====================================
    // UPDATE USER
    // ====================================

    public Task UpdateAsync(User user)
    {
        _context.Users.Update(user);

        return Task.CompletedTask;
    }

    // ====================================
    // SAVE CHANGES
    // ====================================

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}