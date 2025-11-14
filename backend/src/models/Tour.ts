import mongoose, { Schema, Document } from 'mongoose';
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
  coordinates: [number, number]; // [longitude, latitude]
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

const locationSchema = new Schema<ILocationDocument>({
  type: {
    type: String,
    default: 'Point',
    enum: ['Point']
  },
  coordinates: {
    type: [Number],
    required: [true, 'Location coordinates are required'],
    validate: {
      validator: function(coords: number[]) {
        return coords.length === 2 && 
               coords[0] !== undefined && coords[0] >= -180 && coords[0] <= 180 && // longitude
               coords[1] !== undefined && coords[1] >= -90 && coords[1] <= 90;     // latitude
      },
      message: 'Coordinates must be [longitude, latitude] within valid ranges'
    }
  },
  address: {
    type: String,
    required: [true, 'Location address is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Location description is required'],
    trim: true
  },
  day: {
    type: Number,
    min: 1
  }
});

const tourSchema = new Schema<ITourDocument>({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Tour name cannot exceed 100 characters'],
    minlength: [5, 'Tour name must be at least 5 characters']
  },
  
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  
  description: {
    type: String,
    required: [true, 'Tour description is required'],
    minlength: [50, 'Description must be at least 50 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot exceed 200 characters'],
    minlength: [10, 'Short description must be at least 10 characters']
  },
  
  price: {
    type: Number,
    required: [true, 'Tour price is required'],
    min: [0, 'Price cannot be negative']
  },
  
  discountPrice: {
    type: Number,
    min: [0, 'Discount price cannot be negative'],
    validate: {
      validator: function(discountPrice: number) {
        // Discount price should be less than regular price
        return !discountPrice || discountPrice < this.price;
      },
      message: 'Discount price must be less than regular price'
    }
  },
  
  duration: {
    type: Number,
    required: [true, 'Tour duration is required'],
    min: [1, 'Duration must be at least 1 day'],
    max: [365, 'Duration cannot exceed 365 days']
  },
  
  maxGroupSize: {
    type: Number,
    required: [true, 'Maximum group size is required'],
    min: [1, 'Group size must be at least 1'],
    max: [50, 'Group size cannot exceed 50 people']
  },
  
  difficulty: {
    type: String,
    required: [true, 'Tour difficulty is required'],
    enum: {
      values: Object.values(TourDifficulty),
      message: 'Difficulty must be easy, medium, or difficult'
    }
  },
  
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at least 1.0'],
    max: [5, 'Rating cannot exceed 5.0'],
    set: (val: number) => Math.round(val * 10) / 10 // Round to 1 decimal place
  },
  
  ratingsQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Ratings quantity cannot be negative']
  },
  
  imageCover: {
    type: String,
    required: [true, 'Tour cover image is required']
  },
  
  images: {
    type: [String],
    validate: {
      validator: function(images: string[]) {
        return images.length <= 10;
      },
      message: 'A tour cannot have more than 10 images'
    }
  },
  
  startDates: {
    type: [Date],
    required: [true, 'Tour must have at least one start date'],
    validate: {
      validator: function(dates: Date[]) {
        return dates.length > 0 && dates.every(date => date > new Date());
      },
      message: 'Tour must have at least one future start date'
    }
  },
  
  secretTour: {
    type: Boolean,
    default: false
  },
  
  startLocation: {
    type: locationSchema,
    required: [true, 'Tour start location is required']
  },
  
  locations: {
    type: [locationSchema],
    validate: {
      validator: function(locations: ILocationDocument[]) {
        return locations.length <= 20;
      },
      message: 'A tour cannot have more than 20 locations'
    }
  },
  
  guides: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async function(guideId: mongoose.Types.ObjectId) {
        const User = mongoose.model('User');
        const guide = await User.findById(guideId);
        return guide && (guide.role === 'tour_guide' || guide.role === 'admin');
      },
      message: 'Guide must be a user with tour_guide or admin role'
    }
  }],
  
  category: {
    type: String,
    required: [true, 'Tour category is required'],
    enum: {
      values: Object.values(TourCategory),
      message: 'Invalid tour category'
    }
  },
  
  highlights: {
    type: [String],
    required: [true, 'Tour must have at least one highlight'],
    validate: {
      validator: function(highlights: string[]) {
        return highlights.length > 0 && highlights.length <= 10;
      },
      message: 'Tour must have 1-10 highlights'
    }
  },
  
  included: {
    type: [String],
    required: [true, 'Tour must specify what is included'],
    validate: {
      validator: function(included: string[]) {
        return included.length > 0;
      },
      message: 'Tour must have at least one included item'
    }
  },
  
  excluded: {
    type: [String],
    default: []
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

/**
 * Virtual Properties
 */
tourSchema.virtual('durationWeeks').get(function() {
  return Math.ceil(this.duration / 7);
});

tourSchema.virtual('effectivePrice').get(function() {
  return this.discountPrice || this.price;
});

tourSchema.virtual('discountPercentage').get(function() {
  if (!this.discountPrice) return 0;
  return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});

// Virtual populate for reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'tour'
});

/**
 * Indexes for performance
 */
// Compound index for common queries
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ startLocation: '2dsphere' }); // Geospatial index
tourSchema.index({ slug: 1 });
tourSchema.index({ category: 1, difficulty: 1 });
tourSchema.index({ secretTour: 1, startDates: 1 });

// Text index for search functionality
tourSchema.index({
  name: 'text',
  description: 'text',
  shortDescription: 'text',
  'startLocation.address': 'text'
}, {
  weights: {
    name: 10,
    shortDescription: 5,
    description: 2,
    'startLocation.address': 1
  }
});

/**
 * Middleware
 */

// Generate slug before saving
tourSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Populate guides on find queries
tourSchema.pre(/^find/, function(this: any, next: any) {
  this.populate({
    path: 'guides',
    select: 'firstName lastName email avatar role'
  });
  next();
});

// Don't show secret tours in regular queries
tourSchema.pre(/^find/, function(this: any, next: any) {
  // 'this' points to the current query
  this.where({ secretTour: { $ne: true } });
  next();
});

/**
 * Static Methods
 */

// Get tour statistics
tourSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);
  
  return stats;
};

// Get monthly tour statistics
tourSchema.statics.getMonthlyPlan = async function(year: number) {
  const plan = await this.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { numTourStarts: -1 }
    }
  ]);
  
  return plan;
};

// Search tours with filters
tourSchema.statics.searchTours = function(searchQuery: string, filters: any = {}) {
  let pipeline: any[] = [];
  
  // Text search stage
  if (searchQuery) {
    pipeline.push({
      $match: { $text: { $search: searchQuery } }
    });
    pipeline.push({
      $addFields: { score: { $meta: 'textScore' } }
    });
  }
  
  // Filter stage
  if (Object.keys(filters).length > 0) {
    pipeline.push({ $match: filters });
  }
  
  // Sort stage
  if (searchQuery) {
    pipeline.push({ $sort: { score: { $meta: 'textScore' } } });
  } else {
    pipeline.push({ $sort: { ratingsAverage: -1, price: 1 } });
  }
  
  return this.aggregate(pipeline);
};

// Get tours within radius
tourSchema.statics.getToursWithin = function(
  distance: number, 
  latlng: [number, number], 
  unit: 'mi' | 'km' = 'km'
) {
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  
  return this.find({
    startLocation: {
      $geoWithin: {
        $centerSphere: [[latlng[1], latlng[0]], radius]
      }
    }
  });
};

// Get distances to tours from a point
tourSchema.statics.getDistances = function(
  latlng: [number, number], 
  unit: 'mi' | 'km' = 'km'
) {
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  
  return this.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [latlng[1], latlng[0]]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        name: 1,
        distance: 1,
        price: 1,
        startLocation: 1
      }
    }
  ]);
};

export const Tour = mongoose.model<ITourDocument>('Tour', tourSchema);
export default Tour;
