import { z } from 'zod';
import { TourDifficulty, TourCategory, BookingStatus, PaymentStatus, BlogCategory, BlogStatus } from '../types/index.js';
/**
 * User Validation Schemas
 */
export declare const userRegistrationSchema: z.ZodObject<{
    firstName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    lastName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    phoneNumber: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    dateOfBirth: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    nationality: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, z.core.$strip>;
export declare const userLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const userUpdateSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    lastName: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    phoneNumber: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    dateOfBirth: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    nationality: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, z.core.$strip>;
export declare const changePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, z.core.$strip>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export declare const resetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const tourCreationSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    shortDescription: z.ZodString;
    price: z.ZodNumber;
    discountPrice: z.ZodOptional<z.ZodNumber>;
    duration: z.ZodNumber;
    maxGroupSize: z.ZodNumber;
    difficulty: z.ZodEnum<typeof TourDifficulty>;
    category: z.ZodEnum<typeof TourCategory>;
    highlights: z.ZodArray<z.ZodString>;
    included: z.ZodArray<z.ZodString>;
    excluded: z.ZodDefault<z.ZodArray<z.ZodString>>;
    startDates: z.ZodArray<z.ZodString>;
    startLocation: z.ZodObject<{
        type: z.ZodDefault<z.ZodLiteral<"Point">>;
        coordinates: z.ZodArray<z.ZodNumber>;
        address: z.ZodString;
        description: z.ZodString;
        day: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    locations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        type: z.ZodDefault<z.ZodLiteral<"Point">>;
        coordinates: z.ZodArray<z.ZodNumber>;
        address: z.ZodString;
        description: z.ZodString;
        day: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const tourUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    discountPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    duration: z.ZodOptional<z.ZodNumber>;
    maxGroupSize: z.ZodOptional<z.ZodNumber>;
    difficulty: z.ZodOptional<z.ZodEnum<typeof TourDifficulty>>;
    category: z.ZodOptional<z.ZodEnum<typeof TourCategory>>;
    highlights: z.ZodOptional<z.ZodArray<z.ZodString>>;
    included: z.ZodOptional<z.ZodArray<z.ZodString>>;
    excluded: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    startDates: z.ZodOptional<z.ZodArray<z.ZodString>>;
    startLocation: z.ZodOptional<z.ZodObject<{
        type: z.ZodDefault<z.ZodLiteral<"Point">>;
        coordinates: z.ZodArray<z.ZodNumber>;
        address: z.ZodString;
        description: z.ZodString;
        day: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    locations: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        type: z.ZodDefault<z.ZodLiteral<"Point">>;
        coordinates: z.ZodArray<z.ZodNumber>;
        address: z.ZodString;
        description: z.ZodString;
        day: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export declare const tourQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    limit: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    sort: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        name: "name";
        price: "price";
        duration: "duration";
        difficulty: "difficulty";
        ratingsAverage: "ratingsAverage";
    }>>;
    order: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<typeof TourCategory>>;
    difficulty: z.ZodOptional<z.ZodEnum<typeof TourDifficulty>>;
    minPrice: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    maxPrice: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    minDuration: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    maxDuration: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
}, z.core.$strip>;
export declare const bookingCreationSchema: z.ZodObject<{
    tour: z.ZodString;
    participants: z.ZodNumber;
    startDate: z.ZodString;
    specialRequests: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    emergencyContact: z.ZodObject<{
        name: z.ZodString;
        relationship: z.ZodString;
        phoneNumber: z.ZodString;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const bookingUpdateSchema: z.ZodObject<{
    participants: z.ZodOptional<z.ZodNumber>;
    startDate: z.ZodOptional<z.ZodString>;
    specialRequests: z.ZodOptional<z.ZodString>;
    emergencyContact: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        relationship: z.ZodString;
        phoneNumber: z.ZodString;
        email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    }, z.core.$strip>>;
    status: z.ZodOptional<z.ZodEnum<typeof BookingStatus>>;
    paymentStatus: z.ZodOptional<z.ZodEnum<typeof PaymentStatus>>;
}, z.core.$strip>;
/**
 * Review Validation Schemas
 */
export declare const reviewCreationSchema: z.ZodObject<{
    tour: z.ZodString;
    rating: z.ZodNumber;
    review: z.ZodString;
}, z.core.$strip>;
export declare const reviewUpdateSchema: z.ZodObject<{
    rating: z.ZodOptional<z.ZodNumber>;
    review: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Blog Validation Schemas
 */
export declare const blogCreationSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    excerpt: z.ZodString;
    featuredImage: z.ZodString;
    tags: z.ZodDefault<z.ZodArray<z.ZodString>>;
    category: z.ZodEnum<typeof BlogCategory>;
    status: z.ZodDefault<z.ZodEnum<typeof BlogStatus>>;
}, z.core.$strip>;
export declare const blogUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    featuredImage: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    category: z.ZodOptional<z.ZodEnum<typeof BlogCategory>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<typeof BlogStatus>>>;
}, z.core.$strip>;
export declare const blogQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    limit: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    sort: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        createdAt: "createdAt";
        title: "title";
        publishedAt: "publishedAt";
        views: "views";
    }>>>;
    order: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<typeof BlogCategory>>;
    status: z.ZodOptional<z.ZodEnum<typeof BlogStatus>>;
    author: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>>;
}, z.core.$strip>;
/**
 * Common Query Schemas
 */
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    limit: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
}, z.core.$strip>;
export declare const mongoIdSchema: z.ZodString;
export declare const sortSchema: z.ZodObject<{
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
}, z.core.$strip>;
/**
 * File Upload Schemas
 */
export declare const fileUploadSchema: z.ZodObject<{
    fieldname: z.ZodString;
    originalname: z.ZodString;
    encoding: z.ZodString;
    mimetype: z.ZodString;
    size: z.ZodNumber;
}, z.core.$strip>;
/**
 * Contact Form Schema
 */
export declare const contactFormSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    subject: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
/**
 * Newsletter Subscription Schema
 */
export declare const newsletterSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type TourCreationInput = z.infer<typeof tourCreationSchema>;
export type TourQueryInput = z.infer<typeof tourQuerySchema>;
export type BookingCreationInput = z.infer<typeof bookingCreationSchema>;
export type ReviewCreationInput = z.infer<typeof reviewCreationSchema>;
export type BlogCreationInput = z.infer<typeof blogCreationSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
//# sourceMappingURL=validation.d.ts.map