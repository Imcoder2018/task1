import { Request } from 'express';

/**
 * TypeScript Type Definitions
 * 
 * This file contains all custom type definitions used throughout the application.
 * Key concepts:
 * - Type safety: Preventing runtime errors by catching type issues at compile time
 * - Interface definitions: Contracts that define object structure
 * - Enum types: Named constants for better code readability
 * - Utility types: Built-in TypeScript types for common patterns
 */

// User related types
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  nationality?: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  TOUR_GUIDE = 'tour_guide'
}

// Tour related types
export interface ITour {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  duration: number; // in days
  maxGroupSize: number;
  difficulty: TourDifficulty;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  startDates: Date[];
  secretTour: boolean;
  startLocation: ILocation;
  locations: ILocation[];
  guides: string[]; // User IDs
  category: TourCategory;
  highlights: string[];
  included: string[];
  excluded: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum TourDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  DIFFICULT = 'difficult'
}

export enum TourCategory {
  ADVENTURE = 'adventure',
  CULTURAL = 'cultural',
  WILDLIFE = 'wildlife',
  BEACH = 'beach',
  MOUNTAIN = 'mountain',
  CITY = 'city'
}

export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  description: string;
  day?: number;
}

// Booking related types
export interface IBooking {
  _id: string;
  tour: string; // Tour ID
  user: string; // User ID
  price: number;
  participants: number;
  totalPrice: number;
  startDate: Date;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentIntentId?: string;
  specialRequests?: string;
  emergencyContact: IEmergencyContact;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface IEmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
}

// Review related types
export interface IReview {
  _id: string;
  review: string;
  rating: number;
  tour: string; // Tour ID
  user: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

// Blog related types
export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string; // User ID
  featuredImage: string;
  tags: string[];
  category: BlogCategory;
  status: BlogStatus;
  views: number;
  readTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export enum BlogCategory {
  TRAVEL_TIPS = 'travel_tips',
  DESTINATION = 'destination',
  CULTURE = 'culture',
  FOOD = 'food',
  ADVENTURE = 'adventure'
}

export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

// Authentication related types
export interface IAuthRequest extends Request {
  user?: IUser;
}

export interface ITokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface IAuthResponse {
  token: string;
  refreshToken: string;
  user: Omit<IUser, 'password'>;
}

// API Response types
export interface IApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  pagination?: IPagination;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Query types
export interface IQueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  search?: string;
  filter?: Record<string, any>;
}

// File upload types
export interface IUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer?: Buffer;
}

// Validation schemas (for Zod)
export interface IUserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ITourCreation {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  duration: number;
  maxGroupSize: number;
  difficulty: TourDifficulty;
  category: TourCategory;
  highlights: string[];
  included: string[];
  excluded: string[];
  startDates: string[];
}

export interface IBookingCreation {
  tour: string;
  participants: number;
  startDate: string;
  specialRequests?: string;
  emergencyContact: IEmergencyContact;
}

// Error types
export interface ICustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

// Email types
export interface IEmailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

// Stats and Analytics types
export interface ITourStats {
  totalTours: number;
  averagePrice: number;
  averageRating: number;
  totalBookings: number;
  popularDestinations: Array<{
    _id: string;
    count: number;
    name: string;
  }>;
}

export interface IUserStats {
  totalUsers: number;
  newUsersThisMonth: number;
  activeUsers: number;
  usersByRole: Array<{
    _id: UserRole;
    count: number;
  }>;
}

export interface IRevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
  }>;
}
