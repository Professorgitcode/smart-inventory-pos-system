namespace backend.DTOs.Auth;

public class LoginRequestDto
{
    // ====================================
    // LOGIN CREDENTIALS
    // ====================================

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}
