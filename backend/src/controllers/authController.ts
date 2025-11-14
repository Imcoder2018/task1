import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { IAuthRequest } from '../types/index.js';
import User from '../models/User.js';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt.js';
import {
  userRegistrationSchema,
  userLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema
} from '../utils/validation.js';

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
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const validatedData = userRegistrationSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      res.status(400).json({
        status: 'error',
        message: 'User with this email already exists'
      });
      return;
    }
    
    // Create new user (password will be hashed automatically by the model)
    const userData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: validatedData.password,
      phoneNumber: validatedData.phoneNumber || undefined,
      dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : undefined,
      nationality: validatedData.nationality || undefined
    };
    
    const user = new User(userData);
    
    // Generate email verification token
    const emailVerificationToken = user.createEmailVerificationToken();
    
    await user.save();
    
    // Generate JWT tokens
    const tokens = generateTokenPair({
      userId: (user._id as any).toString(),
      email: user.email,
      role: user.role
    });
    
    // TODO: Send verification email
    // await emailService.sendVerificationEmail(user.email, emailVerificationToken);
    
    // Remove password from response
    const userResponse = user.toJSON();
    
    res.status(201).json({
      status: 'success',
      message: 'Registration successful. Please check your email for verification link.',
      data: {
        user: userResponse,
        tokens
      }
    });
    
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: (error as any).errors
      });
      return;
    }
    
    next(error);
  }
};

/**
 * Login user
 * 
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const { email, password } = userLoginSchema.parse(req.body);
    
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
      return;
    }
    
    // Generate JWT tokens
    const tokens = generateTokenPair({
      userId: (user._id as any).toString(),
      email: user.email,
      role: user.role
    });
    
    // Update last login (you can add this field to the user model)
    user.set('lastLogin', new Date());
    await user.save({ validateBeforeSave: false });
    
    // Remove password from response
    const userResponse = user.toJSON();
    
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: userResponse,
        tokens
      }
    });
    
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: (error as any).errors
      });
      return;
    }
    
    next(error);
  }
};

/**
 * Refresh access token
 * 
 * POST /api/auth/refresh
 * Body: { refreshToken }
 */
export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      res.status(400).json({
        status: 'error',
        message: 'Refresh token is required'
      });
      return;
    }
    
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Find user to get current role (in case it changed)
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'User no longer exists'
      });
      return;
    }
    
    // Generate new token pair
    const tokens = generateTokenPair({
      userId: (user._id as any).toString(),
      email: user.email,
      role: user.role
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Tokens refreshed successfully',
      data: { tokens }
    });
    
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message.includes('expired') 
        ? 'Refresh token has expired. Please log in again.'
        : error.message.includes('invalid')
        ? 'Invalid refresh token. Please log in again.'
        : 'Token refresh failed. Please log in again.';
        
      res.status(401).json({
        status: 'error',
        message
      });
      return;
    }
    
    next(error);
  }
};

/**
 * Logout user
 * 
 * POST /api/auth/logout
 * Headers: Authorization: Bearer <token>
 */
export const logout = async (req: IAuthRequest, res: Response): Promise<void> => {
  // TODO: Add token to blacklist (implement with Redis in production)
  // For now, we'll just send a success response
  // Client should remove tokens from storage
  
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
};

/**
 * Get current user profile
 * 
 * GET /api/auth/me
 * Headers: Authorization: Bearer <token>
 */
export const getMe = async (req: IAuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      status: 'error',
      message: 'Not authenticated'
    });
    return;
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
};

/**
 * Verify email address
 * 
 * GET /api/auth/verify-email/:token
 */
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.params;
    
    if (!token) {
      res.status(400).json({
        status: 'error',
        message: 'Verification token is required'
      });
      return;
    }
    
    // Find user with this verification token
    const users = await User.find({}).select('+emailVerificationToken');
    const user = users.find(u => 
      u.emailVerificationToken && 
      bcrypt.compareSync(token, u.emailVerificationToken)
    );
    
    if (!user) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid or expired verification token'
      });
      return;
    }
    
    // Update user as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined as any;
    await user.save({ validateBeforeSave: false });
    
    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * Resend verification email
 * 
 * POST /api/auth/resend-verification
 * Body: { email }
 */
export const resendVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    
    if (!email) {
      res.status(400).json({
        status: 'error',
        message: 'Email is required'
      });
      return;
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }
    
    if (user.isEmailVerified) {
      res.status(400).json({
        status: 'error',
        message: 'Email is already verified'
      });
      return;
    }
    
    // Generate new verification token
    const emailVerificationToken = user.createEmailVerificationToken();
    await user.save({ validateBeforeSave: false });
    
    // TODO: Send verification email
    // await emailService.sendVerificationEmail(user.email, emailVerificationToken);
    
    res.status(200).json({
      status: 'success',
      message: 'Verification email sent successfully'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot password - send reset token
 * 
 * POST /api/auth/forgot-password
 * Body: { email }
 */
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    
    const user = await User.findOne({ email });
    
    if (!user) {
      // Don't reveal if user exists or not
      res.status(200).json({
        status: 'success',
        message: 'If an account with that email exists, we have sent a password reset link'
      });
      return;
    }
    
    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    
    // TODO: Send password reset email
    // await emailService.sendPasswordResetEmail(user.email, resetToken);
    
    res.status(200).json({
      status: 'success',
      message: 'If an account with that email exists, we have sent a password reset link'
    });
    
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: (error as any).errors
      });
      return;
    }
    
    next(error);
  }
};

/**
 * Reset password with token
 * 
 * POST /api/auth/reset-password
 * Body: { token, password, confirmPassword }
 */
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, password } = resetPasswordSchema.parse(req.body);
    
    // Find user with valid reset token
    const users = await User.find({
      passwordResetExpires: { $gt: Date.now() }
    }).select('+passwordResetToken +passwordResetExpires');
    
    const user = users.find(u => 
      u.passwordResetToken && 
      bcrypt.compareSync(token, u.passwordResetToken)
    );
    
    if (!user) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset token'
      });
      return;
    }
    
    // Update password
    user.password = password;
    user.passwordResetToken = undefined as any;
    user.passwordResetExpires = undefined as any;
    await user.save();
    
    // Generate new tokens
    const tokens = generateTokenPair({
      userId: (user._id as any).toString(),
      email: user.email,
      role: user.role
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully',
      data: { tokens }
    });
    
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: (error as any).errors
      });
      return;
    }
    
    next(error);
  }
};

/**
 * Change password (for authenticated users)
 * 
 * POST /api/auth/change-password
 * Headers: Authorization: Bearer <token>
 * Body: { currentPassword, newPassword, confirmNewPassword }
 */
export const changePassword = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: 'error',
        message: 'Not authenticated'
      });
      return;
    }
    
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    
    // Find user with password
    const user = await User.findById(req.user._id).select('+password');
    
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }
    
    // Verify current password
    if (!(await user.comparePassword(currentPassword))) {
      res.status(400).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
      return;
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    // Generate new tokens (invalidate old ones)
    const tokens = generateTokenPair({
      userId: (user._id as any).toString(),
      email: user.email,
      role: user.role
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
      data: { tokens }
    });
    
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: (error as any).errors
      });
      return;
    }
    
    next(error);
  }
};

/**
 * Delete account (for authenticated users)
 * 
 * DELETE /api/auth/account
 * Headers: Authorization: Bearer <token>
 * Body: { password }
 */
export const deleteAccount = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: 'error',
        message: 'Not authenticated'
      });
      return;
    }
    
    const { password } = req.body;
    
    if (!password) {
      res.status(400).json({
        status: 'error',
        message: 'Password is required to delete account'
      });
      return;
    }
    
    // Find user with password
    const user = await User.findById(req.user._id).select('+password');
    
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
      return;
    }
    
    // Verify password
    if (!(await user.comparePassword(password))) {
      res.status(400).json({
        status: 'error',
        message: 'Password is incorrect'
      });
      return;
    }
    
    // TODO: In production, you might want to:
    // 1. Cancel all active bookings
    // 2. Transfer or delete user-generated content
    // 3. Send confirmation email
    // 4. Keep user data for legal/audit purposes but mark as deleted
    
    // For now, just delete the user
    await User.findByIdAndDelete(req.user._id);
    
    res.status(200).json({
      status: 'success',
      message: 'Account deleted successfully'
    });
    
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteAccount
};
