import jwt from 'jsonwebtoken';
/**
 * JWT Utility Functions
 *
 * This module handles JSON Web Token operations for authentication.
 * Key concepts covered:
 *
 * 1. Token Generation: Creating secure access and refresh tokens
 * 2. Token Verification: Validating and decoding tokens
 * 3. Security Best Practices: Token expiration and secret management
 * 4. Error Handling: Proper JWT error management
 * 5. TypeScript Integration: Type-safe token operations
 */
/**
 * Generate JWT access token
 * Access tokens are short-lived (7 days default) and used for API authentication
 */
export const generateAccessToken = (payload) => {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
    if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not defined');
    }
    try {
        return jwt.sign(payload, jwtSecret, {
            expiresIn: jwtExpiresIn,
            issuer: 'hepta-travel',
            audience: 'hepta-travel-users',
            algorithm: 'HS256'
        });
    }
    catch (error) {
        throw new Error('Failed to generate access token');
    }
};
/**
 * Generate JWT refresh token
 * Refresh tokens are long-lived (30 days default) and used to get new access tokens
 */
export const generateRefreshToken = (payload) => {
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    const jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
    if (!jwtRefreshSecret) {
        throw new Error('JWT_REFRESH_SECRET environment variable is not defined');
    }
    try {
        return jwt.sign(payload, jwtRefreshSecret, {
            expiresIn: jwtRefreshExpiresIn,
            issuer: 'hepta-travel',
            audience: 'hepta-travel-refresh',
            algorithm: 'HS256'
        });
    }
    catch (error) {
        throw new Error('Failed to generate refresh token');
    }
};
/**
 * Verify JWT access token
 * Returns the decoded payload if valid, throws error if invalid
 */
export const verifyAccessToken = (token) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not defined');
    }
    try {
        const decoded = jwt.verify(token, jwtSecret, {
            issuer: 'hepta-travel',
            audience: 'hepta-travel-users',
            algorithms: ['HS256']
        });
        return decoded;
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Access token has expired');
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid access token');
        }
        else if (error instanceof jwt.NotBeforeError) {
            throw new Error('Access token not active yet');
        }
        else {
            throw new Error('Failed to verify access token');
        }
    }
};
/**
 * Verify JWT refresh token
 * Returns the decoded payload if valid, throws error if invalid
 */
export const verifyRefreshToken = (token) => {
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    if (!jwtRefreshSecret) {
        throw new Error('JWT_REFRESH_SECRET environment variable is not defined');
    }
    try {
        const decoded = jwt.verify(token, jwtRefreshSecret, {
            issuer: 'hepta-travel',
            audience: 'hepta-travel-refresh',
            algorithms: ['HS256']
        });
        return decoded;
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Refresh token has expired');
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid refresh token');
        }
        else if (error instanceof jwt.NotBeforeError) {
            throw new Error('Refresh token not active yet');
        }
        else {
            throw new Error('Failed to verify refresh token');
        }
    }
};
/**
 * Decode JWT token without verification
 * Useful for extracting information from expired tokens
 */
export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    }
    catch (error) {
        return null;
    }
};
/**
 * Extract token from Authorization header
 * Supports "Bearer <token>" format
 */
export const extractTokenFromHeader = (authHeader) => {
    if (!authHeader) {
        return null;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }
    return parts[1] || null;
};
/**
 * Check if token is expired
 * Returns true if token is expired or invalid
 */
export const isTokenExpired = (token) => {
    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) {
            return true;
        }
        // JWT exp is in seconds, Date.now() is in milliseconds
        return decoded.exp * 1000 < Date.now();
    }
    catch (error) {
        return true;
    }
};
/**
 * Get token expiration time
 * Returns Date object of when token expires, or null if invalid
 */
export const getTokenExpiration = (token) => {
    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) {
            return null;
        }
        return new Date(decoded.exp * 1000);
    }
    catch (error) {
        return null;
    }
};
/**
 * Get time until token expiration in seconds
 * Returns number of seconds until expiration, or 0 if expired/invalid
 */
export const getTokenTimeToLive = (token) => {
    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) {
            return 0;
        }
        const expirationTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const ttl = Math.max(0, Math.floor((expirationTime - currentTime) / 1000));
        return ttl;
    }
    catch (error) {
        return 0;
    }
};
/**
 * Generate token pair (access + refresh)
 * Returns both access and refresh tokens for a user
 */
export const generateTokenPair = (payload) => {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken({
        userId: payload.userId,
        email: payload.email
    });
    return { accessToken, refreshToken };
};
/**
 * Refresh access token using refresh token
 * Validates refresh token and generates new access token
 */
export const refreshAccessToken = async (refreshToken, getCurrentUserRole) => {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    // Get current user role (in case it changed)
    const currentRole = await getCurrentUserRole(decoded.userId);
    // Generate new access token
    return generateAccessToken({
        userId: decoded.userId,
        email: decoded.email,
        role: currentRole
    });
};
/**
 * Blacklist/invalidate token (for logout)
 * In production, you would store blacklisted tokens in Redis or database
 * This is a placeholder implementation
 */
export const blacklistToken = (token) => {
    // TODO: Implement token blacklisting
    // In a production environment, you would:
    // 1. Store the token in Redis with TTL = token expiration time
    // 2. Check blacklisted tokens in the authentication middleware
    // 3. Use a database table for persistent blacklisting
    console.log(`Token blacklisted: ${token.substring(0, 20)}...`);
};
/**
 * Check if token is blacklisted
 * This is a placeholder implementation
 */
export const isTokenBlacklisted = (token) => {
    // TODO: Implement blacklist checking
    // In a production environment, you would:
    // 1. Check Redis for the token
    // 2. Query database blacklist table
    // 3. Return true if found
    return false;
};
export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    decodeToken,
    extractTokenFromHeader,
    isTokenExpired,
    getTokenExpiration,
    getTokenTimeToLive,
    generateTokenPair,
    refreshAccessToken,
    blacklistToken,
    isTokenBlacklisted
};
//# sourceMappingURL=jwt.js.map