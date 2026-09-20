namespace backend.Models;

public class User
{
    // ====================================
    // PRIMARY KEY
    // ====================================

    public int Id { get; set; }

    // ====================================
    // LOGIN INFORMATION
    // ====================================

    public string Username { get; set; } = string.Empty;

    // ====================================
    // PASSWORD
    // ====================================
    // This stores the HASHED password.
    // NEVER store the user's plain-text password.
    // ====================================

    public string PasswordHash { get; set; } = string.Empty;

    // ====================================
    // USER INFORMATION
    // ====================================

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    // ====================================
    // AUTHORIZATION
    // ====================================
    // We will use this later when implementing
    // role-based authorization.
    // ====================================

    public string Role { get; set; } = "User";

    // ====================================
    // ACCOUNT STATUS
    // ====================================

    public bool IsActive { get; set; } = true;

    // ====================================
    // AUDIT INFORMATION
    // ====================================

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? LastLoginAt { get; set; }
}
