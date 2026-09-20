namespace backend.DTOs.Auth;

public class LoginResponseDto
{
    // ====================================
    // JWT ACCESS TOKEN
    // ====================================

    public string Token { get; set; } = string.Empty;

    // ====================================
    // TOKEN EXPIRATION
    // ====================================

    public DateTime ExpiresAt { get; set; }

    // ====================================
    // AUTHENTICATED USER
    // ====================================

    public UserDto User { get; set; } = new();
}
