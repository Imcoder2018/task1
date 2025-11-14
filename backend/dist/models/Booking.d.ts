import mongoose, { Document } from 'mongoose';
import { BookingStatus, PaymentStatus } from '../types/index.js';
/**
 * Booking Model
 *
 * This model handles tour bookings and reservations.
 * Key concepts demonstrated:
 *
 * 1. Complex Business Logic: Booking validation and pricing calculations
 * 2. References: Multiple model relationships (Tour, User)
 * 3. Embedded Documents: Emergency contact information
 * 4. Middleware: Automatic calculations and validations
 * 5. Static Methods: Business operations and analytics
 * 6. Indexes: Performance optimization for common queries
 * 7. Virtual Populate: Related data without storing references
 */
interface IEmergencyContactDocument {
    name: string;
    relationship: string;
    phoneNumber: string;
    email?: string;
}
export interface IBookingDocument extends Document {
    tour: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    price: number;
    participants: number;
    totalPrice: number;
    startDate: Date;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    paymentIntentId?: string;
    specialRequests?: string;
    emergencyContact: IEmergencyContactDocument;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Booking: mongoose.Model<IBookingDocument, {}, {}, {}, mongoose.Document<unknown, {}, IBookingDocument, {}, {}> & IBookingDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Booking;
//# sourceMappingURL=Booking.d.ts.map