import mongoose, { Schema, Document } from 'mongoose';

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

const reviewSchema = new Schema<IReviewDocument>({
  review: {
    type: String,
    required: [true, 'Review text is required'],
    trim: true,
    minlength: [10, 'Review must be at least 10 characters long'],
    maxlength: [1000, 'Review cannot exceed 1000 characters']
  },
  
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    validate: {
      validator: function(rating: number) {
        return Number.isInteger(rating * 2); // Allow half ratings (1, 1.5, 2, 2.5, etc.)
      },
      message: 'Rating must be in increments of 0.5'
    }
  },
  
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour']
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

/**
 * Indexes
 */
// Prevent duplicate reviews from same user for same tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.index({ tour: 1, rating: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });

/**
 * Virtual Properties
 */
reviewSchema.virtual('isRecent').get(function() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return this.createdAt >= thirtyDaysAgo;
});

reviewSchema.virtual('ratingStars').get(function() {
  const fullStars = Math.floor(this.rating);
  const hasHalfStar = this.rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(this.rating);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  };
});

/**
 * Middleware
 */

// Populate user data on queries
reviewSchema.pre(/^find/, function(this: any, next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName avatar'
  });
  next();
});

// Validate that user has actually booked this tour before allowing review
reviewSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Booking = mongoose.model('Booking');
    const booking = await Booking.findOne({
      user: this.user,
      tour: this.tour,
      status: { $in: ['confirmed', 'completed'] },
      paymentStatus: 'paid'
    });
    
    if (!booking) {
      throw new Error('You can only review tours you have booked and completed');
    }
    
    // Check if tour has already started (can't review future tours)
    const hasStarted = booking.startDate <= new Date();
    if (!hasStarted) {
      throw new Error('You can only review tours after they have started');
    }
  }
  next();
});

// Update tour statistics after save/update/delete
reviewSchema.post('save', async function() {
  await (this.constructor as any).calcAverageRatings(this.tour);
});

reviewSchema.post('findOneAndUpdate', async function() {
  if (this.getUpdate()) {
    await (this.model as any).calcAverageRatings(this.getQuery().tour);
  }
});

reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await (doc.constructor as any).calcAverageRatings(doc.tour);
  }
});

/**
 * Static Methods
 */

// Calculate average ratings and update tour
reviewSchema.statics.calcAverageRatings = async function(tourId: mongoose.Types.ObjectId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  
  const Tour = mongoose.model('Tour');
  
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: Math.round(stats[0].avgRating * 10) / 10 // Round to 1 decimal
    });
  } else {
    // No reviews, reset to defaults
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

// Get review statistics
reviewSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        ratingDistribution: {
          $push: '$rating'
        }
      }
    },
    {
      $project: {
        _id: 0,
        totalReviews: 1,
        averageRating: { $round: ['$averageRating', 1] },
        ratingDistribution: 1
      }
    }
  ]);
  
  if (stats.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: []
    };
  }
  
  // Calculate rating distribution
  const distribution = stats[0].ratingDistribution;
  const ratingCounts = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  };
  
  distribution.forEach((rating: number) => {
    const rounded = Math.round(rating);
    if (rounded >= 1 && rounded <= 5) {
      ratingCounts[rounded as keyof typeof ratingCounts]++;
    }
  });
  
  return {
    ...stats[0],
    ratingCounts
  };
};

// Get reviews for a specific tour with pagination
reviewSchema.statics.getTourReviews = function(
  tourId: string, 
  page: number = 1, 
  limit: number = 10,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc'
) {
  const skip = (page - 1) * limit;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  
  return this.find({ tour: tourId })
    .sort({ [sortBy]: sortDirection })
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'user',
      select: 'firstName lastName avatar'
    });
};

// Get reviews by rating range
reviewSchema.statics.getReviewsByRating = function(
  minRating: number = 1, 
  maxRating: number = 5
) {
  return this.find({
    rating: { $gte: minRating, $lte: maxRating }
  }).populate('user', 'firstName lastName avatar')
    .populate('tour', 'name slug')
    .sort({ createdAt: -1 });
};

// Get recent reviews
reviewSchema.statics.getRecentReviews = function(days: number = 30, limit: number = 10) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return this.find({
    createdAt: { $gte: cutoffDate }
  }).populate('user', 'firstName lastName avatar')
    .populate('tour', 'name slug')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Get user's reviews with pagination
reviewSchema.statics.getUserReviews = function(
  userId: string,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;
  
  return this.find({ user: userId })
    .populate('tour', 'name slug imageCover')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// Search reviews by text
reviewSchema.statics.searchReviews = function(searchTerm: string) {
  return this.find({
    review: { $regex: searchTerm, $options: 'i' }
  }).populate('user', 'firstName lastName avatar')
    .populate('tour', 'name slug')
    .sort({ createdAt: -1 });
};

// Get tour rating breakdown
reviewSchema.statics.getTourRatingBreakdown = async function(tourId: string) {
  const breakdown = await this.aggregate([
    {
      $match: { tour: new mongoose.Types.ObjectId(tourId) }
    },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: -1 }
    }
  ]);
  
  // Initialize all ratings to 0
  const ratingBreakdown = [5, 4, 3, 2, 1].map(rating => {
    const found = breakdown.find(item => item._id === rating);
    return {
      rating,
      count: found ? found.count : 0
    };
  });
  
  const totalReviews = breakdown.reduce((sum, item) => sum + item.count, 0);
  
  return {
    breakdown: ratingBreakdown.map(item => ({
      ...item,
      percentage: totalReviews > 0 ? Math.round((item.count / totalReviews) * 100) : 0
    })),
    totalReviews
  };
};

export const Review = mongoose.model<IReviewDocument>('Review', reviewSchema);
export default Review;
