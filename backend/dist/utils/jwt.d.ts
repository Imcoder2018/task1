import { ITokenPayload } from '../types/index.js';
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
export declare const generateAccessToken: (payload: {
    userId: string;
    email: string;
    role: string;
}) => string;
/**
 * Generate JWT refresh token
 * Refresh tokens are long-lived (30 days default) and used to get new access tokens
 */
export declare const generateRefreshToken: (payload: {
    userId: string;
    email: string;
}) => string;
/**
 * Verify JWT access token
 * Returns the decoded payload if valid, throws error if invalid
 */
export declare const verifyAccessToken: (token: string) => ITokenPayload;
/**
 * Verify JWT refresh token
 * Returns the decoded payload if valid, throws error if invalid
 */
export declare const verifyRefreshToken: (token: string) => Omit<ITokenPayload, "role">;
/**
 * Decode JWT token without verification
 * Useful for extracting information from expired tokens
 */
export declare const decodeToken: (token: string) => ITokenPayload | null;
/**
 * Extract token from Authorization header
 * Supports "Bearer <token>" format
 */
export declare const extractTokenFromHeader: (authHeader?: string) => string | null;
/**
 * Check if token is expired
 * Returns true if token is expired or invalid
 */
export declare const isTokenExpired: (token: string) => boolean;
/**
 * Get token expiration time
 * Returns Date object of when token expires, or null if invalid
 */
export declare const getTokenExpiration: (token: string) => Date | null;
/**
 * Get time until token expiration in seconds
 * Returns number of seconds until expiration, or 0 if expired/invalid
 */
export declare const getTokenTimeToLive: (token: string) => number;
/**
 * Generate token pair (access + refresh)
 * Returns both access and refresh tokens for a user
 */
export declare const generateTokenPair: (payload: {
    userId: string;
    email: string;
    role: string;
}) => {
    accessToken: string;
    refreshToken: string;
};
/**
 * Refresh access token using refresh token
 * Validates refresh token and generates new access token
 */
export declare const refreshAccessToken: (refreshToken: string, getCurrentUserRole: (userId: string) => Promise<string>) => Promise<string>;
/**
 * Blacklist/invalidate token (for logout)
 * In production, you would store blacklisted tokens in Redis or database
 * This is a placeholder implementation
 */
export declare const blacklistToken: (token: string) => void;
/**
 * Check if token is blacklisted
 * This is a placeholder implementation
 */
export declare const isTokenBlacklisted: (token: string) => boolean;
declare const _default: {
    generateAccessToken: (payload: {
        userId: string;
        email: string;
        role: string;
    }) => string;
    generateRefreshToken: (payload: {
        userId: string;
        email: string;
    }) => string;
    verifyAccessToken: (token: string) => ITokenPayload;
    verifyRefreshToken: (token: string) => Omit<ITokenPayload, "role">;
    decodeToken: (token: string) => ITokenPayload | null;
    extractTokenFromHeader: (authHeader?: string) => string | null;
    isTokenExpired: (token: string) => boolean;
    getTokenExpiration: (token: string) => Date | null;
    getTokenTimeToLive: (token: string) => number;
    generateTokenPair: (payload: {
        userId: string;
        email: string;
        role: string;
    }) => {
        accessToken: string;
        refreshToken: string;
    };
    refreshAccessToken: (refreshToken: string, getCurrentUserRole: (userId: string) => Promise<string>) => Promise<string>;
    blacklistToken: (token: string) => void;
    isTokenBlacklisted: (token: string) => boolean;
};
export default _default;
//# sourceMappingURL=jwt.d.ts.map