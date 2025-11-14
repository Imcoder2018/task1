import { Request, Response, NextFunction } from 'express';
import { IAuthRequest, IUser, UserRole } from '../types/index.js';
import { verifyAccessToken, extractTokenFromHeader } from '../utils/jwt.js';
import User from '../models/User.js';

/**
 * Authentication & Authorization Middleware
 * 
 * This module provides middleware functions for protecting routes and checking permissions.
 * Key concepts covered:
 * 
 * 1. Authentication: Verifying user identity via JWT tokens
 * 2. Authorization: Checking user permissions for specific actions
 * 3. Role-Based Access Control (RBAC): Different access levels for different user types
 * 4. Middleware Pattern: Reusable request processing functions
 * 5. Error Handling: Proper error responses for auth failures
 * 6. Security Best Practices: Token validation and user verification
 */

/**
 * Custom error class for authentication errors
 */
class AuthError extends Error {
  statusCode: number;
  status: string;
  
  constructor(message: string, statusCode: number = 401) {
    super(message);
    this.statusCode = statusCode;
    this.status = 'error';
    this.name = 'AuthError';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Authentication middleware
 * 
 * Verifies JWT token and attaches user to request object
 * Must be used before any protected routes
 */
export const authenticate = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract token from Authorization header
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      throw new AuthError('Authentication token is required', 401);
    }

    // Verify the token
    const decoded = verifyAccessToken(token);
    
    // Find the user and check if they still exist
    const user = await User.findById(decoded.userId).select('+password');
    
    if (!user) {
      throw new AuthError('User no longer exists', 401);
    }

    // Check if user is active (not banned/disabled)
    if (!user.isEmailVerified) {
      throw new AuthError('Please verify your email address to access this resource', 401);
    }

    // Attach user to request object (excluding password)
    req.user = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      nationality: user.nationality,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    } as IUser;

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    // Handle JWT-specific errors
    if (error instanceof Error) {
      const message = error.message.includes('expired') 
        ? 'Authentication token has expired. Please log in again.'
        : error.message.includes('invalid')
        ? 'Invalid authentication token. Please log in again.'
        : 'Authentication failed. Please log in again.';
        
      res.status(401).json({
        status: 'error',
        message
      });
      return;
    }

    // Generic error
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during authentication'
    });
  }
};

/**
 * Optional authentication middleware
 * 
 * Attaches user to request if token is provided, but doesn't require authentication
 * Useful for routes that have different behavior for authenticated vs anonymous users
 */
export const optionalAuthenticate = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId);
      
      if (user && user.isEmailVerified) {
        req.user = {
          _id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth,
          nationality: user.nationality,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        } as any;
      }
    }
    
    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just continue without user
    next();
  }
};

/**
 * Authorization middleware factory
 * 
 * Creates middleware that checks if user has required roles
 * Can be chained with authenticate middleware
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: IAuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
      return;
    }

    if (!roles.includes(req.user.role as UserRole)) {
      res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions to access this resource'
      });
      return;
    }

    next();
  };
};

/**
 * Check if user is admin
 */
export const requireAdmin = authorize(UserRole.ADMIN);

/**
 * Check if user is tour guide or admin
 */
export const requireTourGuide = authorize(UserRole.TOUR_GUIDE, UserRole.ADMIN);

/**
 * Resource ownership middleware factory
 * 
 * Checks if the authenticated user owns the resource or is an admin
 * Useful for protecting user-specific resources like bookings, reviews, etc.
 */
export const requireOwnership = (getResourceUserId: (req: IAuthRequest) => string | undefined) => {
  return (req: IAuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
      return;
    }

    const resourceUserId = getResourceUserId(req);
    
    if (!resourceUserId) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid resource or resource ID not provided'
      });
      return;
    }

    // Allow if user owns the resource or is an admin
    if (req.user._id !== resourceUserId && req.user.role !== UserRole.ADMIN) {
      res.status(403).json({
        status: 'error',
        message: 'You can only access your own resources'
      });
      return;
    }

    next();
  };
};

/**
 * Rate limiting middleware for authentication attempts
 * 
 * Prevents brute force attacks on login endpoints
 */
export const authRateLimit = (req: Request, res: Response, next: NextFunction): void => {
  // This would typically use Redis or in-memory store
  // For now, we'll use a simple in-memory implementation
  
  const attempts = new Map<string, { count: number; resetTime: number }>();
  const maxAttempts = 5;
  const windowMs = 15 * 60 * 1000; // 15 minutes
  
  const key = req.ip;
  const now = Date.now();
  const attempt = attempts.get(key);
  
  if (attempt) {
    if (now < attempt.resetTime) {
      if (attempt.count >= maxAttempts) {
        res.status(429).json({
          status: 'error',
          message: 'Too many authentication attempts. Please try again later.',
          retryAfter: Math.ceil((attempt.resetTime - now) / 1000)
        });
        return;
      }
      attempt.count++;
    } else {
      // Reset window
      attempts.set(key, { count: 1, resetTime: now + windowMs });
    }
  } else {
    attempts.set(key, { count: 1, resetTime: now + windowMs });
  }
  
  next();
};

/**
 * Middleware to check if user account is active
 * 
 * Ensures only active, verified users can access protected resources
 */
export const requireActiveAccount = (req: IAuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      status: 'error',
      message: 'Authentication required'
    });
    return;
  }

  if (!req.user.isEmailVerified) {
    res.status(403).json({
      status: 'error',
      message: 'Please verify your email address to continue',
      action: 'email_verification_required'
    });
    return;
  }

  next();
};

/**
 * Middleware to extract and validate user from different sources
 * 
 * Can get user from request params, body, or authenticated user
 */
export const validateUser = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let userId: string | undefined;
    
    // Try to get user ID from params, body, or authenticated user
    if (req.params.userId) {
      userId = req.params.userId;
    } else if (req.body.userId) {
      userId = req.body.userId;
    } else if (req.user) {
      userId = req.user._id.toString();
    }
    
    if (!userId) {
      res.status(400).json({
        status: 'error',
        message: 'User ID is required'
      });
      return;
    }
    
    // Validate MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid user ID format'
      });
      return;
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }
    
    // Attach target user to request for further processing
    req.targetUser = user as any;
    next();
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error validating user'
    });
  }
};

/**
 * Middleware to check API key for external integrations
 * 
 * Alternative authentication method for API access
 */
export const authenticateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) {
    res.status(401).json({
      status: 'error',
      message: 'API key is required'
    });
    return;
  }
  
  // In production, validate against stored API keys
  const validApiKeys = process.env.API_KEYS?.split(',') || [];
  
  if (!validApiKeys.includes(apiKey)) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid API key'
    });
    return;
  }
  
  next();
};

// Extend Request type to include targetUser
declare global {
  namespace Express {
    interface Request {
      targetUser?: IUser;
    }
  }
}

export default {
  authenticate,
  optionalAuthenticate,
  authorize,
  requireAdmin,
  requireTourGuide,
  requireOwnership,
  authRateLimit,
  requireActiveAccount,
  validateUser,
  authenticateApiKey
};
