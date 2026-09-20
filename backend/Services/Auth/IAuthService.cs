using backend.DTOs.Auth;

namespace backend.Services.Auth;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto request);
}
