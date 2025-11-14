import { Request, Response, NextFunction } from 'express';
import { IAuthRequest, IUser, UserRole } from '../types/index.js';
/**
 * Authentication middleware
 *
 * Verifies JWT token and attaches user to request object
 * Must be used before any protected routes
 */
export declare const authenticate: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Optional authentication middleware
 *
 * Attaches user to request if token is provided, but doesn't require authentication
 * Useful for routes that have different behavior for authenticated vs anonymous users
 */
export declare const optionalAuthenticate: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Authorization middleware factory
 *
 * Creates middleware that checks if user has required roles
 * Can be chained with authenticate middleware
 */
export declare const authorize: (...roles: UserRole[]) => (req: IAuthRequest, res: Response, next: NextFunction) => void;
/**
 * Check if user is admin
 */
export declare const requireAdmin: (req: IAuthRequest, res: Response, next: NextFunction) => void;
/**
 * Check if user is tour guide or admin
 */
export declare const requireTourGuide: (req: IAuthRequest, res: Response, next: NextFunction) => void;
/**
 * Resource ownership middleware factory
 *
 * Checks if the authenticated user owns the resource or is an admin
 * Useful for protecting user-specific resources like bookings, reviews, etc.
 */
export declare const requireOwnership: (getResourceUserId: (req: IAuthRequest) => string | undefined) => (req: IAuthRequest, res: Response, next: NextFunction) => void;
/**
 * Rate limiting middleware for authentication attempts
 *
 * Prevents brute force attacks on login endpoints
 */
export declare const authRateLimit: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Middleware to check if user account is active
 *
 * Ensures only active, verified users can access protected resources
 */
export declare const requireActiveAccount: (req: IAuthRequest, res: Response, next: NextFunction) => void;
/**
 * Middleware to extract and validate user from different sources
 *
 * Can get user from request params, body, or authenticated user
 */
export declare const validateUser: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Middleware to check API key for external integrations
 *
 * Alternative authentication method for API access
 */
export declare const authenticateApiKey: (req: Request, res: Response, next: NextFunction) => void;
declare global {
    namespace Express {
        interface Request {
            targetUser?: IUser;
        }
    }
}
declare const _default: {
    authenticate: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
    optionalAuthenticate: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
    authorize: (...roles: UserRole[]) => (req: IAuthRequest, res: Response, next: NextFunction) => void;
    requireAdmin: (req: IAuthRequest, res: Response, next: NextFunction) => void;
    requireTourGuide: (req: IAuthRequest, res: Response, next: NextFunction) => void;
    requireOwnership: (getResourceUserId: (req: IAuthRequest) => string | undefined) => (req: IAuthRequest, res: Response, next: NextFunction) => void;
    authRateLimit: (req: Request, res: Response, next: NextFunction) => void;
    requireActiveAccount: (req: IAuthRequest, res: Response, next: NextFunction) => void;
    validateUser: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
    authenticateApiKey: (req: Request, res: Response, next: NextFunction) => void;
};
export default _default;
//# sourceMappingURL=auth.d.ts.map