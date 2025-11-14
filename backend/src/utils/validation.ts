import { z } from 'zod';
import { UserRole, TourDifficulty, TourCategory, BookingStatus, PaymentStatus, BlogCategory, BlogStatus } from '../types/index.js';

/**
 * Validation Schemas using Zod
 * 
 * This module provides type-safe validation schemas for API inputs.
 * Key concepts covered:
 * 
 * 1. Input Validation: Ensuring data integrity and security
 * 2. Type Safety: Runtime validation that matches TypeScript types
 * 3. Custom Validators: Business-specific validation rules
 * 4. Error Handling: Descriptive validation error messages
 * 5. Schema Composition: Reusable validation components
 * 6. Transform Functions: Data normalization during validation
 */

// Common validation helpers
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Custom validators
const isValidDate = (date: string) => {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
};

const isAdult = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
};

const isFutureDate = (date: string) => {
  return new Date(date) > new Date();
};

/**
 * User Validation Schemas
 */

export const userRegistrationSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .trim()
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()),
    
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .trim()
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()),
    
  email: z.string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
    
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
  confirmPassword: z.string(),
  
  phoneNumber: z.string()
    .regex(phoneRegex, 'Please provide a valid phone number')
    .optional()
    .or(z.literal('')),
    
  dateOfBirth: z.string()
    .refine(isValidDate, 'Please provide a valid date')
    .refine(isAdult, 'You must be at least 18 years old to register')
    .optional()
    .or(z.literal('')),
    
  nationality: z.string()
    .max(100, 'Nationality cannot exceed 100 characters')
    .trim()
    .optional()
    .or(z.literal(''))
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export const userLoginSchema = z.object({
  email: z.string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
    
  password: z.string()
    .min(1, 'Password is required')
});

export const userUpdateSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .trim()
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase())
    .optional(),
    
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .trim()
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase())
    .optional(),
    
  phoneNumber: z.string()
    .regex(phoneRegex, 'Please provide a valid phone number')
    .optional()
    .or(z.literal('')),
    
  dateOfBirth: z.string()
    .refine(isValidDate, 'Please provide a valid date')
    .refine(isAdult, 'You must be at least 18 years old')
    .optional()
    .or(z.literal('')),
    
  nationality: z.string()
    .max(100, 'Nationality cannot exceed 100 characters')
    .trim()
    .optional()
    .or(z.literal(''))
});

export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(1, 'Current password is required'),
    
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
  confirmNewPassword: z.string()
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'New passwords do not match',
  path: ['confirmNewPassword']
});

export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim()
});

export const resetPasswordSchema = z.object({
  token: z.string()
    .min(1, 'Reset token is required'),
    
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

/**
 * Tour Validation Schemas
 */

const coordinatesSchema = z.array(z.number())
  .length(2, 'Coordinates must contain exactly [longitude, latitude]')
  .refine(coords => coords?.[0] !== undefined && coords[0] >= -180 && coords[0] <= 180, 'Longitude must be between -180 and 180')
  .refine(coords => coords?.[1] !== undefined && coords[1] >= -90 && coords[1] <= 90, 'Latitude must be between -90 and 90');

const locationSchema = z.object({
  type: z.literal('Point').default('Point'),
  coordinates: coordinatesSchema,
  address: z.string().min(1, 'Address is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  day: z.number().min(1).optional()
});

export const tourCreationSchema = z.object({
  name: z.string()
    .min(5, 'Tour name must be at least 5 characters')
    .max(100, 'Tour name cannot exceed 100 characters')
    .trim(),
    
  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim(),
    
  shortDescription: z.string()
    .min(10, 'Short description must be at least 10 characters')
    .max(200, 'Short description cannot exceed 200 characters')
    .trim(),
    
  price: z.number()
    .min(0, 'Price cannot be negative')
    .max(100000, 'Price cannot exceed $100,000'),
    
  discountPrice: z.number()
    .min(0, 'Discount price cannot be negative')
    .optional(),
    
  duration: z.number()
    .min(1, 'Duration must be at least 1 day')
    .max(365, 'Duration cannot exceed 365 days'),
    
  maxGroupSize: z.number()
    .min(1, 'Group size must be at least 1')
    .max(50, 'Group size cannot exceed 50'),
    
  difficulty: z.nativeEnum(TourDifficulty),
  
  category: z.nativeEnum(TourCategory),
  
  highlights: z.array(z.string().trim())
    .min(1, 'At least one highlight is required')
    .max(10, 'Maximum 10 highlights allowed'),
    
  included: z.array(z.string().trim())
    .min(1, 'At least one included item is required'),
    
  excluded: z.array(z.string().trim()).default([]),
  
  startDates: z.array(z.string().refine(isFutureDate, 'All start dates must be in the future'))
    .min(1, 'At least one start date is required'),
    
  startLocation: locationSchema,
  
  locations: z.array(locationSchema)
    .max(20, 'Maximum 20 locations allowed')
    .default([])
}).refine(data => !data.discountPrice || data.discountPrice < data.price, {
  message: 'Discount price must be less than regular price',
  path: ['discountPrice']
});

export const tourUpdateSchema = tourCreationSchema.partial();

export const tourQuerySchema = z.object({
  page: z.string().transform(val => parseInt(val) || 1).optional(),
  limit: z.string().transform(val => Math.min(parseInt(val) || 10, 100)).optional(),
  sort: z.enum(['name', 'price', 'duration', 'difficulty', 'ratingsAverage', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).default('asc').optional(),
  search: z.string().trim().optional(),
  category: z.nativeEnum(TourCategory).optional(),
  difficulty: z.nativeEnum(TourDifficulty).optional(),
  minPrice: z.string().transform(val => parseFloat(val) || 0).optional(),
  maxPrice: z.string().transform(val => parseFloat(val) || Infinity).optional(),
  minDuration: z.string().transform(val => parseInt(val) || 1).optional(),
  maxDuration: z.string().transform(val => parseInt(val) || 365).optional()
});

/**
 * Booking Validation Schemas
 */

const emergencyContactSchema = z.object({
  name: z.string()
    .min(1, 'Emergency contact name is required')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
    
  relationship: z.string()
    .min(1, 'Relationship is required')
    .max(50, 'Relationship cannot exceed 50 characters')
    .trim(),
    
  phoneNumber: z.string()
    .regex(phoneRegex, 'Please provide a valid phone number'),
    
  email: z.string()
    .email('Please provide a valid email')
    .toLowerCase()
    .trim()
    .optional()
    .or(z.literal(''))
});

export const bookingCreationSchema = z.object({
  tour: z.string()
    .min(1, 'Tour ID is required')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid tour ID format'),
    
  participants: z.number()
    .min(1, 'At least 1 participant required')
    .max(20, 'Maximum 20 participants per booking'),
    
  startDate: z.string()
    .refine(isValidDate, 'Please provide a valid date')
    .refine(isFutureDate, 'Start date must be in the future'),
    
  specialRequests: z.string()
    .max(500, 'Special requests cannot exceed 500 characters')
    .trim()
    .optional()
    .or(z.literal('')),
    
  emergencyContact: emergencyContactSchema
});

export const bookingUpdateSchema = z.object({
  participants: z.number()
    .min(1, 'At least 1 participant required')
    .max(20, 'Maximum 20 participants per booking')
    .optional(),
    
  startDate: z.string()
    .refine(isValidDate, 'Please provide a valid date')
    .refine(isFutureDate, 'Start date must be in the future')
    .optional(),
    
  specialRequests: z.string()
    .max(500, 'Special requests cannot exceed 500 characters')
    .trim()
    .optional(),
    
  emergencyContact: emergencyContactSchema.optional(),
  
  status: z.nativeEnum(BookingStatus).optional(),
  
  paymentStatus: z.nativeEnum(PaymentStatus).optional()
});

/**
 * Review Validation Schemas
 */

export const reviewCreationSchema = z.object({
  tour: z.string()
    .min(1, 'Tour ID is required')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid tour ID format'),
    
  rating: z.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .refine(rating => Number.isInteger(rating * 2), 'Rating must be in increments of 0.5'),
    
  review: z.string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review cannot exceed 1000 characters')
    .trim()
});

export const reviewUpdateSchema = z.object({
  rating: z.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .refine(rating => Number.isInteger(rating * 2), 'Rating must be in increments of 0.5')
    .optional(),
    
  review: z.string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review cannot exceed 1000 characters')
    .trim()
    .optional()
});

/**
 * Blog Validation Schemas
 */

export const blogCreationSchema = z.object({
  title: z.string()
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title cannot exceed 200 characters')
    .trim(),
    
  content: z.string()
    .min(100, 'Content must be at least 100 characters')
    .trim(),
    
  excerpt: z.string()
    .min(50, 'Excerpt must be at least 50 characters')
    .max(300, 'Excerpt cannot exceed 300 characters')
    .trim(),
    
  featuredImage: z.string()
    .url('Please provide a valid image URL'),
    
  tags: z.array(z.string().trim())
    .max(10, 'Maximum 10 tags allowed')
    .default([]),
    
  category: z.nativeEnum(BlogCategory),
  
  status: z.nativeEnum(BlogStatus).default(BlogStatus.DRAFT)
});

export const blogUpdateSchema = blogCreationSchema.partial();

export const blogQuerySchema = z.object({
  page: z.string().transform(val => parseInt(val) || 1).optional(),
  limit: z.string().transform(val => Math.min(parseInt(val) || 10, 50)).optional(),
  sort: z.enum(['title', 'createdAt', 'publishedAt', 'views']).default('publishedAt').optional(),
  order: z.enum(['asc', 'desc']).default('desc').optional(),
  search: z.string().trim().optional(),
  category: z.nativeEnum(BlogCategory).optional(),
  status: z.nativeEnum(BlogStatus).optional(),
  author: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid author ID').optional(),
  tags: z.string().transform(val => val.split(',')).optional()
});

/**
 * Common Query Schemas
 */

export const paginationSchema = z.object({
  page: z.string().transform(val => Math.max(1, parseInt(val) || 1)).optional(),
  limit: z.string().transform(val => Math.min(100, Math.max(1, parseInt(val) || 10))).optional()
});

export const mongoIdSchema = z.string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

export const sortSchema = z.object({
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('asc').optional()
});

/**
 * File Upload Schemas
 */

export const fileUploadSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string().refine(
    type => type.startsWith('image/'),
    'Only image files are allowed'
  ),
  size: z.number().max(10 * 1024 * 1024, 'File size cannot exceed 10MB')
});

/**
 * Contact Form Schema
 */

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
    
  email: z.string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
    
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject cannot exceed 200 characters')
    .trim(),
    
  message: z.string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message cannot exceed 1000 characters')
    .trim()
});

/**
 * Newsletter Subscription Schema
 */

export const newsletterSchema = z.object({
  email: z.string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim()
});

export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type TourCreationInput = z.infer<typeof tourCreationSchema>;
export type TourQueryInput = z.infer<typeof tourQuerySchema>;
export type BookingCreationInput = z.infer<typeof bookingCreationSchema>;
export type ReviewCreationInput = z.infer<typeof reviewCreationSchema>;
export type BlogCreationInput = z.infer<typeof blogCreationSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
