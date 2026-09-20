using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.Auth;

public class JwtTokenService : IJwtTokenService
{
    // ====================================
    // CONFIGURATION
    // ====================================

    private readonly IConfiguration _configuration;

    // ====================================
    // CONSTRUCTOR
    // ====================================

    public JwtTokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // ====================================
    // GENERATE JWT ACCESS TOKEN
    // ====================================

    public string GenerateToken(
        int userId,
        string username,
        string? role,
        DateTime expiresAt)
    {
        // ====================================
        // READ JWT CONFIGURATION
        // ====================================

        var key = _configuration["Jwt:Key"];
        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];

        // ====================================
        // VALIDATE CONFIGURATION
        // ====================================

        if (string.IsNullOrWhiteSpace(key))
        {
            throw new InvalidOperationException(
                "JWT signing key is not configured."
            );
        }

        if (string.IsNullOrWhiteSpace(issuer))
        {
            throw new InvalidOperationException(
                "JWT issuer is not configured."
            );
        }

        if (string.IsNullOrWhiteSpace(audience))
        {
            throw new InvalidOperationException(
                "JWT audience is not configured."
            );
        }

        // ====================================
        // CREATE CLAIMS
        // ====================================

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, userId.ToString()),

            new(
                JwtRegisteredClaimNames.UniqueName,
                username
            ),

            new(
                ClaimTypes.NameIdentifier,
                userId.ToString()
            ),

            new(
                ClaimTypes.Name,
                username
            )
        };

        // ====================================
        // TEMPORARY ROLE CLAIM
        // ====================================

        // IMPORTANT:
        //
        // The current User model contains a single Role
        // property only because authorization has not yet
        // been implemented.
        //
        // Our eventual authorization model will support:
        //
        // User
        //   └── multiple Roles
        //         └── Permissions
        //
        // Temporary authorities will also be supported.
        //
        // Therefore, do NOT design the rest of the
        // authorization architecture around this single
        // role claim.

        if (!string.IsNullOrWhiteSpace(role))
        {
            claims.Add(
                new Claim(ClaimTypes.Role, role)
            );
        }

        // ====================================
        // SIGNING KEY
        // ====================================

        var securityKey =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key)
            );

        // ====================================
        // SIGNING CREDENTIALS
        // ====================================

        var credentials =
            new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256
            );

        // ====================================
        // CREATE JWT
        // ====================================

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials
        );

        // ====================================
        // SERIALIZE JWT
        // ====================================

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}