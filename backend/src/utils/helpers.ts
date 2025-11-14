import mongoose from 'mongoose';
import { IUser } from '../types/index.js';

/**
 * Helper utility functions
 * 
 * This module provides utility functions for common operations.
 */

/**
 * Convert Mongoose user document to IUser type
 * Safely handles type conversion and removes sensitive fields
 */
export const mongoUserToUser = (userDoc: any): IUser => {
  const userObj = userDoc.toObject ? userDoc.toObject() : userDoc;
  
  return {
    _id: userObj._id.toString(),
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    role: userObj.role,
    avatar: userObj.avatar,
    phoneNumber: userObj.phoneNumber,
    dateOfBirth: userObj.dateOfBirth,
    nationality: userObj.nationality,
    isEmailVerified: userObj.isEmailVerified,
    emailVerificationToken: userObj.emailVerificationToken,
    passwordResetToken: userObj.passwordResetToken,
    passwordResetExpires: userObj.passwordResetExpires,
    createdAt: userObj.createdAt,
    updatedAt: userObj.updatedAt
  };
};

/**
 * Convert Mongoose user document to safe user response (no sensitive data)
 */
export const mongoUserToSafeUser = (userDoc: any): Omit<IUser, 'password' | 'emailVerificationToken' | 'passwordResetToken' | 'passwordResetExpires'> => {
  const userObj = userDoc.toObject ? userDoc.toObject() : userDoc;
  
  return {
    _id: userObj._id.toString(),
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    role: userObj.role,
    avatar: userObj.avatar,
    phoneNumber: userObj.phoneNumber,
    dateOfBirth: userObj.dateOfBirth,
    nationality: userObj.nationality,
    isEmailVerified: userObj.isEmailVerified,
    createdAt: userObj.createdAt,
    updatedAt: userObj.updatedAt
  };
};

/**
 * Validate MongoDB ObjectId
 */
export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Convert string to MongoDB ObjectId
 */
export const toObjectId = (id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(id);
};

/**
 * Generate random string
 */
export const generateRandomString = (length: number = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Safe string trim that handles null/undefined
 */
export const safeTrim = (str: string | null | undefined): string => {
  return str?.trim() ?? '';
};

/**
 * Calculate age from birth date
 */
export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Generate slug from string
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Remove undefined values from object
 */
export const removeUndefined = (obj: Record<string, any>): Record<string, any> => {
  const cleaned: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  
  return cleaned;
};

/**
 * Pagination helper
 */
export const getPaginationInfo = (
  total: number,
  page: number,
  limit: number
) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  
  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage,
    hasPreviousPage
  };
};

/**
 * Async delay utility
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Try-catch wrapper for async functions
 */
export const asyncTryCatch = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<[Error | null, R | null]> => {
    try {
      const result = await fn(...args);
      return [null, result];
    } catch (error) {
      return [error as Error, null];
    }
  };
};

export default {
  mongoUserToUser,
  mongoUserToSafeUser,
  isValidObjectId,
  toObjectId,
  generateRandomString,
  safeTrim,
  calculateAge,
  formatCurrency,
  capitalize,
  generateSlug,
  deepClone,
  removeUndefined,
  getPaginationInfo,
  delay,
  asyncTryCatch
};
