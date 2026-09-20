using backend.Models;

namespace backend.Repositories.Auth;

public interface IUserRepository
{
    // ====================================
    // FIND USER BY USERNAME
    // ====================================

    Task<User?> GetByUsernameAsync(string username);

    // ====================================
    // FIND USER BY ID
    // ====================================

    Task<User?> GetByIdAsync(int id);

    // ====================================
    // CREATE USER
    // ====================================

    Task<User> CreateAsync(User user);

    // ====================================
    // UPDATE USER
    // ====================================

    Task UpdateAsync(User user);

    // ====================================
    // SAVE CHANGES
    // ====================================

    Task SaveChangesAsync();
}
