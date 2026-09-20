namespace backend.DTOs.Auth;

public class UserDto
{
    // ====================================
    // USER IDENTITY
    // ====================================

    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    // ====================================
    // USER INFORMATION
    // ====================================

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    // ====================================
    // CURRENT AUTHORIZATION INFORMATION
    // ====================================
    // This is temporarily represented as a
    // single role.
    //
    // The authorization system will later
    // support multiple roles per user.
    // ====================================

    public string Role { get; set; } = string.Empty;

    // ====================================
    // ACCOUNT STATUS
    // ====================================

    public bool IsActive { get; set; }

    // ====================================
    // AUDIT INFORMATION
    // ====================================

    public DateTime? LastLoginAt { get; set; }
}
