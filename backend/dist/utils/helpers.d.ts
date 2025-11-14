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
export declare const mongoUserToUser: (userDoc: any) => IUser;
/**
 * Convert Mongoose user document to safe user response (no sensitive data)
 */
export declare const mongoUserToSafeUser: (userDoc: any) => Omit<IUser, "password" | "emailVerificationToken" | "passwordResetToken" | "passwordResetExpires">;
/**
 * Validate MongoDB ObjectId
 */
export declare const isValidObjectId: (id: string) => boolean;
/**
 * Convert string to MongoDB ObjectId
 */
export declare const toObjectId: (id: string) => mongoose.Types.ObjectId;
/**
 * Generate random string
 */
export declare const generateRandomString: (length?: number) => string;
/**
 * Safe string trim that handles null/undefined
 */
export declare const safeTrim: (str: string | null | undefined) => string;
/**
 * Calculate age from birth date
 */
export declare const calculateAge: (birthDate: Date) => number;
/**
 * Format currency
 */
export declare const formatCurrency: (amount: number, currency?: string) => string;
/**
 * Capitalize first letter
 */
export declare const capitalize: (str: string) => string;
/**
 * Generate slug from string
 */
export declare const generateSlug: (text: string) => string;
/**
 * Deep clone object
 */
export declare const deepClone: <T>(obj: T) => T;
/**
 * Remove undefined values from object
 */
export declare const removeUndefined: (obj: Record<string, any>) => Record<string, any>;
/**
 * Pagination helper
 */
export declare const getPaginationInfo: (total: number, page: number, limit: number) => {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
/**
 * Async delay utility
 */
export declare const delay: (ms: number) => Promise<void>;
/**
 * Try-catch wrapper for async functions
 */
export declare const asyncTryCatch: <T extends any[], R>(fn: (...args: T) => Promise<R>) => (...args: T) => Promise<[Error | null, R | null]>;
declare const _default: {
    mongoUserToUser: (userDoc: any) => IUser;
    mongoUserToSafeUser: (userDoc: any) => Omit<IUser, "password" | "emailVerificationToken" | "passwordResetToken" | "passwordResetExpires">;
    isValidObjectId: (id: string) => boolean;
    toObjectId: (id: string) => mongoose.Types.ObjectId;
    generateRandomString: (length?: number) => string;
    safeTrim: (str: string | null | undefined) => string;
    calculateAge: (birthDate: Date) => number;
    formatCurrency: (amount: number, currency?: string) => string;
    capitalize: (str: string) => string;
    generateSlug: (text: string) => string;
    deepClone: <T>(obj: T) => T;
    removeUndefined: (obj: Record<string, any>) => Record<string, any>;
    getPaginationInfo: (total: number, page: number, limit: number) => {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    delay: (ms: number) => Promise<void>;
    asyncTryCatch: <T extends any[], R>(fn: (...args: T) => Promise<R>) => (...args: T) => Promise<[Error | null, R | null]>;
};
export default _default;
//# sourceMappingURL=helpers.d.ts.map