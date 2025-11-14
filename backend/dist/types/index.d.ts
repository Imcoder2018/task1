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
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin",
    TOUR_GUIDE = "tour_guide"
}
export interface ITour {
    _id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    discountPrice?: number;
    duration: number;
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
    guides: string[];
    category: TourCategory;
    highlights: string[];
    included: string[];
    excluded: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare enum TourDifficulty {
    EASY = "easy",
    MEDIUM = "medium",
    DIFFICULT = "difficult"
}
export declare enum TourCategory {
    ADVENTURE = "adventure",
    CULTURAL = "cultural",
    WILDLIFE = "wildlife",
    BEACH = "beach",
    MOUNTAIN = "mountain",
    CITY = "city"
}
export interface ILocation {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    description: string;
    day?: number;
}
export interface IBooking {
    _id: string;
    tour: string;
    user: string;
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
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
    REFUNDED = "refunded"
}
export interface IEmergencyContact {
    name: string;
    relationship: string;
    phoneNumber: string;
    email?: string;
}
export interface IReview {
    _id: string;
    review: string;
    rating: number;
    tour: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IBlog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: string;
    featuredImage: string;
    tags: string[];
    category: BlogCategory;
    status: BlogStatus;
    views: number;
    readTime: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum BlogCategory {
    TRAVEL_TIPS = "travel_tips",
    DESTINATION = "destination",
    CULTURE = "culture",
    FOOD = "food",
    ADVENTURE = "adventure"
}
export declare enum BlogStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
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
export interface IQueryOptions {
    page?: number;
    limit?: number;
    sort?: string;
    fields?: string;
    search?: string;
    filter?: Record<string, any>;
}
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
export interface ICustomError extends Error {
    statusCode?: number;
    status?: string;
    isOperational?: boolean;
}
export interface IEmailOptions {
    to: string;
    subject: string;
    template: string;
    context: Record<string, any>;
}
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
//# sourceMappingURL=index.d.ts.map