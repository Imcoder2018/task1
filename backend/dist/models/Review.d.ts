import mongoose, { Document } from 'mongoose';
/**
 * Review Model
 *
 * This model handles tour reviews and ratings from users.
 * Key concepts demonstrated:
 *
 * 1. Compound Indexes: Preventing duplicate reviews
 * 2. Post Middleware: Calculating average ratings
 * 3. Static Methods: Review analytics and filtering
 * 4. Query Middleware: Automatic population
 * 5. Validation: Business rules enforcement
 * 6. Aggregation: Complex rating calculations
 */
export interface IReviewDocument extends Document {
    review: string;
    rating: number;
    tour: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Review: mongoose.Model<IReviewDocument, {}, {}, {}, mongoose.Document<unknown, {}, IReviewDocument, {}, {}> & IReviewDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Review;
//# sourceMappingURL=Review.d.ts.map