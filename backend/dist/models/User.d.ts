import mongoose, { Document } from 'mongoose';
import { UserRole } from '../types/index.js';
/**
 * User Model
 *
 * This model defines the structure for user data in MongoDB using Mongoose.
 * Key concepts covered:
 *
 * 1. Schema Definition: Defining the structure and validation rules
 * 2. Middleware: Pre/post hooks for data processing (password hashing)
 * 3. Instance Methods: Custom methods available on user documents
 * 4. Static Methods: Custom methods available on the User model
 * 5. Virtual Properties: Computed properties not stored in DB
 * 6. Indexing: Database optimization for faster queries
 * 7. Validation: Data integrity and business rules enforcement
 */
export interface IUserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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
    comparePassword(candidatePassword: string): Promise<boolean>;
    createPasswordResetToken(): string;
    createEmailVerificationToken(): string;
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=User.d.ts.map