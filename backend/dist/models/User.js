import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types/index.js';
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot be more than 50 characters'],
        minlength: [2, 'First name must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot be more than 50 characters'],
        minlength: [2, 'Last name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Please provide a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // Don't include password in query results by default
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
        required: true
    },
    avatar: {
        type: String,
        default: function () {
            // Generate a default avatar URL using the user's initials
            return `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}&background=65c0ba&color=fff&size=200`;
        }
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (phone) {
                // Basic international phone number validation
                return /^[\+]?[1-9][\d]{0,15}$/.test(phone);
            },
            message: 'Please provide a valid phone number'
        }
    },
    dateOfBirth: {
        type: Date,
        validate: {
            validator: function (date) {
                // User must be at least 13 years old
                const thirteenYearsAgo = new Date();
                thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
                return date <= thirteenYearsAgo;
            },
            message: 'You must be at least 13 years old to register'
        }
    },
    nationality: {
        type: String,
        trim: true,
        maxlength: [100, 'Nationality cannot be more than 100 characters']
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            const { password, emailVerificationToken, passwordResetToken, passwordResetExpires, __v, ...cleanRet } = ret;
            return cleanRet;
        }
    },
    toObject: { virtuals: true }
});
/**
 * Virtual Properties
 * These are computed properties that don't get stored in MongoDB
 */
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
userSchema.virtual('age').get(function () {
    if (!this.dateOfBirth)
        return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});
/**
 * Indexes for query optimization
 * Compound indexes for common query patterns
 */
userSchema.index({ email: 1 }); // Single field index for email lookups
userSchema.index({ role: 1, isEmailVerified: 1 }); // Compound index for admin queries
userSchema.index({ createdAt: 1 }); // Index for sorting by registration date
/**
 * Pre-save middleware
 * Automatically hash password before saving to database
 */
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password'))
        return next();
    try {
        // Hash password with cost of 12
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    }
    catch (error) {
        next(error);
    }
});
/**
 * Instance Methods
 * Methods available on individual user documents
 */
// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    }
    catch (error) {
        throw new Error('Password comparison failed');
    }
};
// Generate password reset token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    // Hash token and set to passwordResetToken field
    this.passwordResetToken = bcrypt.hashSync(resetToken, 10);
    // Set expire time (10 minutes from now)
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    // Return unhashed token (to send via email)
    return resetToken;
};
// Generate email verification token
userSchema.methods.createEmailVerificationToken = function () {
    const verificationToken = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    // Hash token and set to emailVerificationToken field
    this.emailVerificationToken = bcrypt.hashSync(verificationToken, 10);
    // Return unhashed token (to send via email)
    return verificationToken;
};
/**
 * Static Methods
 * Methods available on the User model itself
 */
// Find user by email (including password for authentication)
userSchema.statics.findByEmailWithPassword = function (email) {
    return this.findOne({ email }).select('+password');
};
// Find users with pagination
userSchema.statics.findWithPagination = function (filter = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};
// Get user statistics
userSchema.statics.getStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                verifiedUsers: {
                    $sum: { $cond: ['$isEmailVerified', 1, 0] }
                },
                usersByRole: {
                    $push: {
                        role: '$role',
                        count: 1
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalUsers: 1,
                verifiedUsers: 1,
                verificationRate: {
                    $multiply: [
                        { $divide: ['$verifiedUsers', '$totalUsers'] },
                        100
                    ]
                }
            }
        }
    ]);
    return stats[0] || {
        totalUsers: 0,
        verifiedUsers: 0,
        verificationRate: 0
    };
};
// Create the User model
export const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map