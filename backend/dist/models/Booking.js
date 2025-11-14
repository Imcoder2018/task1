import mongoose, { Schema } from 'mongoose';
import { BookingStatus, PaymentStatus } from '../types/index.js';
const emergencyContactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Emergency contact name is required'],
        trim: true,
        maxlength: [100, 'Emergency contact name cannot exceed 100 characters']
    },
    relationship: {
        type: String,
        required: [true, 'Relationship to emergency contact is required'],
        trim: true,
        maxlength: [50, 'Relationship cannot exceed 50 characters']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Emergency contact phone number is required'],
        validate: {
            validator: function (phone) {
                return /^[\+]?[1-9][\d]{0,15}$/.test(phone);
            },
            message: 'Please provide a valid emergency contact phone number'
        }
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (email) {
                return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Please provide a valid emergency contact email address'
        }
    }
});
const bookingSchema = new Schema({
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: [true, 'Booking must belong to a tour']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a user']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price'],
        min: [0, 'Price cannot be negative']
    },
    participants: {
        type: Number,
        required: [true, 'Number of participants is required'],
        min: [1, 'Must have at least 1 participant'],
        max: [20, 'Cannot exceed 20 participants per booking']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: function (date) {
                return date > new Date();
            },
            message: 'Start date must be in the future'
        }
    },
    status: {
        type: String,
        enum: {
            values: Object.values(BookingStatus),
            message: 'Invalid booking status'
        },
        default: BookingStatus.PENDING
    },
    paymentStatus: {
        type: String,
        enum: {
            values: Object.values(PaymentStatus),
            message: 'Invalid payment status'
        },
        default: PaymentStatus.PENDING
    },
    paymentIntentId: {
        type: String,
        sparse: true // Allow multiple null values
    },
    specialRequests: {
        type: String,
        maxlength: [500, 'Special requests cannot exceed 500 characters'],
        trim: true
    },
    emergencyContact: {
        type: emergencyContactSchema,
        required: [true, 'Emergency contact information is required']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
/**
 * Virtual Properties
 */
bookingSchema.virtual('pricePerParticipant').get(function () {
    return this.totalPrice / this.participants;
});
bookingSchema.virtual('isPaid').get(function () {
    return this.paymentStatus === PaymentStatus.PAID;
});
bookingSchema.virtual('isActive').get(function () {
    return this.status === BookingStatus.CONFIRMED &&
        this.paymentStatus === PaymentStatus.PAID;
});
bookingSchema.virtual('daysUntilStart').get(function () {
    const now = new Date();
    const start = new Date(this.startDate);
    const timeDiff = start.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
});
/**
 * Indexes for performance
 */
bookingSchema.index({ tour: 1, startDate: 1 });
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ paymentStatus: 1, createdAt: -1 });
bookingSchema.index({ status: 1, startDate: 1 });
// Compound index for booking conflicts
bookingSchema.index({ tour: 1, startDate: 1, status: 1 });
/**
 * Middleware
 */
// Pre-save middleware to calculate total price and validate booking
bookingSchema.pre('save', async function (next) {
    try {
        // Only run on new bookings or when participants/price changes
        if (this.isNew || this.isModified('participants') || this.isModified('price')) {
            this.totalPrice = this.price * this.participants;
        }
        // Validate tour availability if this is a new booking
        if (this.isNew) {
            const Tour = mongoose.model('Tour');
            const tour = await Tour.findById(this.tour);
            if (!tour) {
                throw new Error('Tour not found');
            }
            // Check if start date is available for this tour
            const isDateAvailable = tour.startDates.some((date) => date.toDateString() === this.startDate.toDateString());
            if (!isDateAvailable) {
                throw new Error('Selected start date is not available for this tour');
            }
            // Check if group size doesn't exceed tour limit
            const existingBookings = await mongoose.model('Booking').find({
                tour: this.tour,
                startDate: this.startDate,
                status: { $in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] }
            });
            const totalParticipants = existingBookings.reduce((sum, booking) => sum + booking.participants, this.participants);
            if (totalParticipants > tour.maxGroupSize) {
                throw new Error(`Tour is fully booked. Maximum group size is ${tour.maxGroupSize}`);
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
// Pre-find middleware to populate tour and user data
bookingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'tour',
        select: 'name imageCover duration difficulty startLocation price'
    }).populate({
        path: 'user',
        select: 'firstName lastName email avatar'
    });
    next();
});
/**
 * Static Methods
 */
// Get booking statistics
bookingSchema.statics.getStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalBookings: { $sum: 1 },
                totalRevenue: { $sum: '$totalPrice' },
                averageBookingValue: { $avg: '$totalPrice' },
                confirmedBookings: {
                    $sum: { $cond: [{ $eq: ['$status', BookingStatus.CONFIRMED] }, 1, 0] }
                },
                paidBookings: {
                    $sum: { $cond: [{ $eq: ['$paymentStatus', PaymentStatus.PAID] }, 1, 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalBookings: 1,
                totalRevenue: 1,
                averageBookingValue: { $round: ['$averageBookingValue', 2] },
                confirmedBookings: 1,
                paidBookings: 1,
                confirmationRate: {
                    $round: [
                        { $multiply: [{ $divide: ['$confirmedBookings', '$totalBookings'] }, 100] },
                        2
                    ]
                },
                paymentRate: {
                    $round: [
                        { $multiply: [{ $divide: ['$paidBookings', '$totalBookings'] }, 100] },
                        2
                    ]
                }
            }
        }
    ]);
    return stats[0] || {
        totalBookings: 0,
        totalRevenue: 0,
        averageBookingValue: 0,
        confirmedBookings: 0,
        paidBookings: 0,
        confirmationRate: 0,
        paymentRate: 0
    };
};
// Get monthly revenue statistics
bookingSchema.statics.getMonthlyRevenue = async function (year) {
    const monthlyRevenue = await this.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                },
                paymentStatus: PaymentStatus.PAID
            }
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                revenue: { $sum: '$totalPrice' },
                bookingCount: { $sum: 1 },
                averageBookingValue: { $avg: '$totalPrice' }
            }
        },
        {
            $sort: { '_id': 1 }
        },
        {
            $project: {
                month: '$_id',
                revenue: { $round: ['$revenue', 2] },
                bookingCount: 1,
                averageBookingValue: { $round: ['$averageBookingValue', 2] },
                _id: 0
            }
        }
    ]);
    return monthlyRevenue;
};
// Get popular tours by bookings
bookingSchema.statics.getPopularTours = async function (limit = 10) {
    const popularTours = await this.aggregate([
        {
            $match: {
                status: { $in: [BookingStatus.CONFIRMED, BookingStatus.COMPLETED] }
            }
        },
        {
            $group: {
                _id: '$tour',
                bookingCount: { $sum: 1 },
                totalRevenue: { $sum: '$totalPrice' },
                totalParticipants: { $sum: '$participants' }
            }
        },
        {
            $lookup: {
                from: 'tours',
                localField: '_id',
                foreignField: '_id',
                as: 'tourDetails'
            }
        },
        {
            $unwind: '$tourDetails'
        },
        {
            $project: {
                tourName: '$tourDetails.name',
                tourSlug: '$tourDetails.slug',
                bookingCount: 1,
                totalRevenue: { $round: ['$totalRevenue', 2] },
                totalParticipants: 1,
                averageRevenuePerBooking: {
                    $round: [{ $divide: ['$totalRevenue', '$bookingCount'] }, 2]
                }
            }
        },
        {
            $sort: { bookingCount: -1 }
        },
        {
            $limit: limit
        }
    ]);
    return popularTours;
};
// Check tour availability for specific date
bookingSchema.statics.checkAvailability = async function (tourId, startDate) {
    const Tour = mongoose.model('Tour');
    const tour = await Tour.findById(tourId);
    if (!tour) {
        throw new Error('Tour not found');
    }
    // Check if date is in tour's start dates
    const isDateAvailable = tour.startDates.some((date) => date.toDateString() === startDate.toDateString());
    if (!isDateAvailable) {
        return { available: false, reason: 'Date not available for this tour' };
    }
    // Count existing bookings for this date
    const existingBookings = await this.find({
        tour: tourId,
        startDate: startDate,
        status: { $in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] }
    });
    const bookedParticipants = existingBookings.reduce((sum, booking) => sum + booking.participants, 0);
    const availableSpots = tour.maxGroupSize - bookedParticipants;
    return {
        available: availableSpots > 0,
        availableSpots,
        maxGroupSize: tour.maxGroupSize,
        bookedParticipants
    };
};
// Cancel booking
bookingSchema.statics.cancelBooking = async function (bookingId, reason) {
    const booking = await this.findById(bookingId);
    if (!booking) {
        throw new Error('Booking not found');
    }
    // Check if booking can be cancelled
    const daysDifference = Math.ceil((booking.startDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (daysDifference < 7) {
        throw new Error('Cannot cancel booking less than 7 days before start date');
    }
    if (booking.status === BookingStatus.CANCELLED) {
        throw new Error('Booking is already cancelled');
    }
    if (booking.status === BookingStatus.COMPLETED) {
        throw new Error('Cannot cancel completed booking');
    }
    booking.status = BookingStatus.CANCELLED;
    // If payment was made, update payment status for refund processing
    if (booking.paymentStatus === PaymentStatus.PAID) {
        booking.paymentStatus = PaymentStatus.REFUNDED;
    }
    await booking.save();
    return booking;
};
export const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
//# sourceMappingURL=Booking.js.map