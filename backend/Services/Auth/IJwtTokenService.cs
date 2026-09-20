namespace backend.Services.Auth;

public interface IJwtTokenService
{
    // ====================================
    // GENERATE JWT ACCESS TOKEN
    // ====================================

    string GenerateToken(
        int userId,
        string username,
        string? role,
        DateTime expiresAt
    );
}