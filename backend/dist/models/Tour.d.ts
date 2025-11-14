import mongoose, { Document } from 'mongoose';
import { TourDifficulty, TourCategory } from '../types/index.js';
/**
 * Tour Model
 *
 * This model represents travel tour packages with all their details.
 * Key concepts demonstrated:
 *
 * 1. Complex Schema Design: Nested objects and arrays
 * 2. Geospatial Data: Using GeoJSON for location data
 * 3. References: Linking to other models (User for guides)
 * 4. Pre/Post Middleware: Automatic slug generation and calculations
 * 5. Virtual Properties: Computed fields like duration in weeks
 * 6. Complex Validations: Custom validation logic
 * 7. Text Indexes: For search functionality
 * 8. Aggregation Pipeline: Complex queries for statistics
 */
interface ILocationDocument {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    description: string;
    day?: number;
}
export interface ITourDocument extends Document {
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
    startLocation: ILocationDocument;
    locations: ILocationDocument[];
    guides: mongoose.Types.ObjectId[];
    category: TourCategory;
    highlights: string[];
    included: string[];
    excluded: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Tour: mongoose.Model<ITourDocument, {}, {}, {}, mongoose.Document<unknown, {}, ITourDocument, {}, {}> & ITourDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Tour;
//# sourceMappingURL=Tour.d.ts.map