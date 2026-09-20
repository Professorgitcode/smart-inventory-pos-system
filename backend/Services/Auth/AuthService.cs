using backend.DTOs.Auth;
using backend.Models;
using backend.Repositories.Auth;
using Microsoft.AspNetCore.Identity;

namespace backend.Services.Auth;

public class AuthService : IAuthService
{
    // ====================================
    // DEPENDENCIES
    // ====================================

    private readonly IUserRepository _userRepository;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IConfiguration _configuration;

    // ====================================
    // CONSTRUCTOR
    // ====================================

    public AuthService(
        IUserRepository userRepository,
        PasswordHasher<User> passwordHasher,
        IJwtTokenService jwtTokenService,
        IConfiguration configuration)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenService = jwtTokenService;
        _configuration = configuration;
    }

    // ====================================
    // USER LOGIN
    // ====================================

    public async Task<LoginResponseDto?> LoginAsync(
        LoginRequestDto request)
    {
        // ====================================
        // VALIDATE LOGIN REQUEST
        // ====================================

        if (string.IsNullOrWhiteSpace(request.Username) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return null;
        }

        // ====================================
        // FIND USER
        // ====================================

        var user = await _userRepository
            .GetByUsernameAsync(request.Username);

        // ====================================
        // INVALID USER
        // ====================================

        // Do not reveal whether the username
        // exists to the client.

        if (user == null)
        {
            return null;
        }

        // ====================================
        // ACCOUNT STATUS
        // ====================================

        // Inactive accounts cannot authenticate.

        if (!user.IsActive)
        {
            return null;
        }

        // ====================================
        // PASSWORD VERIFICATION
        // ====================================

        var passwordResult =
            _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password
            );

        // ====================================
        // INVALID PASSWORD
        // ====================================

        if (passwordResult ==
            PasswordVerificationResult.Failed)
        {
            return null;
        }

        // ====================================
        // PASSWORD HASH UPGRADE
        // ====================================

        // PasswordHasher can indicate that an older
        // password hash should be replaced using
        // a newer hashing configuration.

        if (passwordResult ==
            PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.PasswordHash =
                _passwordHasher.HashPassword(
                    user,
                    request.Password
                );
        }

        // ====================================
        // UPDATE LAST LOGIN
        // ====================================

        user.LastLoginAt = DateTime.UtcNow;

        await _userRepository.UpdateAsync(user);

        await _userRepository.SaveChangesAsync();

        // ====================================
        // READ JWT EXPIRATION CONFIGURATION
        // ====================================

        var expirationMinutes =
            _configuration.GetValue<int>(
                "Jwt:ExpirationMinutes"
            );

        // ====================================
        // VALIDATE JWT EXPIRATION CONFIGURATION
        // ====================================

        if (expirationMinutes <= 0)
        {
            throw new InvalidOperationException(
                "JWT expiration time must be greater than zero."
            );
        }

        // ====================================
        // CALCULATE TOKEN EXPIRATION
        // ====================================

        var expiresAt =
            DateTime.UtcNow.AddMinutes(
                expirationMinutes
            );

        // ====================================
        // GENERATE JWT ACCESS TOKEN
        // ====================================

        var token =
            _jwtTokenService.GenerateToken(
                user.Id,
                user.Username,
                user.Role,
                expiresAt
            );

        // ====================================
        // BUILD USER DTO
        // ====================================

        var userDto = new UserDto
        {
            Id = user.Id,

            Username = user.Username,

            FirstName = user.FirstName,

            LastName = user.LastName,

            Email = user.Email,

            // ====================================
            // TEMPORARY SINGLE ROLE
            // ====================================

            // This remains temporary.
            //
            // The future authorization architecture
            // will support multiple roles per user,
            // permissions, and temporary authorities.

            Role = user.Role,

            IsActive = user.IsActive,

            LastLoginAt = user.LastLoginAt
        };

        // ====================================
        // BUILD LOGIN RESPONSE
        // ====================================

        return new LoginResponseDto
        {
            // ====================================
            // JWT ACCESS TOKEN
            // ====================================

            Token = token,

            // ====================================
            // TOKEN EXPIRATION
            // ====================================

            ExpiresAt = expiresAt,

            // ====================================
            // AUTHENTICATED USER
            // ====================================

            User = userDto
        };
    }
}