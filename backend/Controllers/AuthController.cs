using backend.DTOs.Auth;
using backend.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // ====================================
    // LOGIN
    // ====================================

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(
        [FromBody] LoginRequestDto request)
    {
        var result =
            await _authService.LoginAsync(request);

        if (result == null)
        {
            return Unauthorized(new
            {
                message = "Invalid username or password."
            });
        }

        return Ok(result);
    }

    // ====================================
    // JWT AUTHENTICATION TEST ENDPOINT
    // ====================================

    [Authorize]
    [HttpGet("me")]
    public IActionResult GetCurrentUser()
    {
        return Ok(new
        {
            isAuthenticated = User.Identity?.IsAuthenticated,
            authenticationType = User.Identity?.AuthenticationType,
            userId = User.FindFirst(
                System.Security.Claims.ClaimTypes.NameIdentifier
            )?.Value,
            username = User.Identity?.Name,
            role = User.FindFirst(
                System.Security.Claims.ClaimTypes.Role
            )?.Value
        });
    }
}