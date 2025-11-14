/**
 * Authentication Routes
 *
 * This module defines all authentication-related API endpoints.
 * Key concepts covered:
 *
 * 1. Express Router: Modular route handling
 * 2. Route Organization: Grouping related endpoints
 * 3. Middleware Application: Adding authentication and rate limiting
 * 4. RESTful API Design: Following REST conventions
 * 5. Security: Rate limiting for sensitive endpoints
 */
declare const router: import("express-serve-static-core").Router;
/**
 * Route Documentation
 *
 * Authentication Flow:
 *
 * 1. Registration:
 *    - User submits registration form
 *    - Server validates data and creates account
 *    - Verification email is sent
 *    - JWT tokens are returned for immediate login
 *
 * 2. Email Verification:
 *    - User clicks link in verification email
 *    - Server validates token and marks email as verified
 *    - User can now access all features
 *
 * 3. Login:
 *    - User submits credentials
 *    - Server validates and returns JWT tokens
 *    - Tokens are used for subsequent API requests
 *
 * 4. Token Refresh:
 *    - When access token expires, use refresh token
 *    - Server validates refresh token and issues new access token
 *    - Continue API requests with new token
 *
 * 5. Password Reset:
 *    - User requests password reset
 *    - Server sends reset email with secure token
 *    - User submits new password with token
 *    - Password is updated and new tokens are issued
 *
 * Security Features:
 *
 * - Rate Limiting: Prevents brute force attacks
 * - JWT Tokens: Secure, stateless authentication
 * - Password Hashing: Bcrypt with salt rounds
 * - Email Verification: Prevents fake accounts
 * - Secure Token Generation: Cryptographically secure tokens
 * - Password Requirements: Strong password validation
 * - Account Lockout: Protection against repeated failed attempts
 */
export default router;
//# sourceMappingURL=authRoutes.d.ts.map