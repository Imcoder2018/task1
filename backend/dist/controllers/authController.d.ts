import { Request, Response, NextFunction } from 'express';
import { IAuthRequest } from '../types/index.js';
/**
 * Authentication Controller
 *
 * Handles all authentication-related operations for the travel website.
 * Key concepts covered:
 *
 * 1. User Registration: Account creation with validation
 * 2. User Login: Secure authentication with JWT
 * 3. Password Security: Hashing and validation
 * 4. Token Management: JWT generation and refresh
 * 5. Password Reset: Secure password recovery flow
 * 6. Email Verification: Account verification process
 * 7. Error Handling: Comprehensive error management
 * 8. Security Best Practices: Rate limiting and validation
 */
/**
 * Register a new user
 *
 * POST /api/auth/register
 * Body: { firstName, lastName, email, password, confirmPassword, phoneNumber?, dateOfBirth?, nationality? }
 */
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Login user
 *
 * POST /api/auth/login
 * Body: { email, password }
 */
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Refresh access token
 *
 * POST /api/auth/refresh
 * Body: { refreshToken }
 */
export declare const refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Logout user
 *
 * POST /api/auth/logout
 * Headers: Authorization: Bearer <token>
 */
export declare const logout: (req: IAuthRequest, res: Response) => Promise<void>;
/**
 * Get current user profile
 *
 * GET /api/auth/me
 * Headers: Authorization: Bearer <token>
 */
export declare const getMe: (req: IAuthRequest, res: Response) => Promise<void>;
/**
 * Verify email address
 *
 * GET /api/auth/verify-email/:token
 */
export declare const verifyEmail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Resend verification email
 *
 * POST /api/auth/resend-verification
 * Body: { email }
 */
export declare const resendVerification: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Forgot password - send reset token
 *
 * POST /api/auth/forgot-password
 * Body: { email }
 */
export declare const forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Reset password with token
 *
 * POST /api/auth/reset-password
 * Body: { token, password, confirmPassword }
 */
export declare const resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Change password (for authenticated users)
 *
 * POST /api/auth/change-password
 * Headers: Authorization: Bearer <token>
 * Body: { currentPassword, newPassword, confirmNewPassword }
 */
export declare const changePassword: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete account (for authenticated users)
 *
 * DELETE /api/auth/account
 * Headers: Authorization: Bearer <token>
 * Body: { password }
 */
export declare const deleteAccount: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
declare const _default: {
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: IAuthRequest, res: Response) => Promise<void>;
    getMe: (req: IAuthRequest, res: Response) => Promise<void>;
    verifyEmail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    resendVerification: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    changePassword: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteAccount: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default _default;
//# sourceMappingURL=authController.d.ts.map