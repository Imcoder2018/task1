import mongoose, { Schema } from 'mongoose';
import { BlogCategory, BlogStatus } from '../types/index.js';
const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
        minlength: [10, 'Title must be at least 10 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Blog content is required'],
        minlength: [100, 'Content must be at least 100 characters']
    },
    excerpt: {
        type: String,
        required: [true, 'Blog excerpt is required'],
        maxlength: [300, 'Excerpt cannot exceed 300 characters'],
        minlength: [50, 'Excerpt must be at least 50 characters']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Blog must have an author']
    },
    featuredImage: {
        type: String,
        required: [true, 'Featured image is required']
    },
    tags: {
        type: [String],
        validate: {
            validator: function (tags) {
                return tags.length <= 10 && tags.every(tag => tag.length <= 50);
            },
            message: 'Maximum 10 tags allowed, each tag must be 50 characters or less'
        },
        set: function (tags) {
            // Convert to lowercase and remove duplicates
            return [...new Set(tags.map(tag => tag.toLowerCase().trim()))];
        }
    },
    category: {
        type: String,
        required: [true, 'Blog category is required'],
        enum: {
            values: Object.values(BlogCategory),
            message: 'Invalid blog category'
        }
    },
    status: {
        type: String,
        enum: {
            values: Object.values(BlogStatus),
            message: 'Invalid blog status'
        },
        default: BlogStatus.DRAFT
    },
    views: {
        type: Number,
        default: 0,
        min: [0, 'Views cannot be negative']
    },
    readTime: {
        type: Number,
        min: [1, 'Read time must be at least 1 minute']
    },
    publishedAt: {
        type: Date,
        validate: {
            validator: function (publishedAt) {
                // If status is published, publishedAt is required
                return this.status !== BlogStatus.PUBLISHED || publishedAt != null;
            },
            message: 'Published date is required for published blogs'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
/**
 * Virtual Properties
 */
blogSchema.virtual('isPublished').get(function () {
    return this.status === BlogStatus.PUBLISHED;
});
blogSchema.virtual('wordCount').get(function () {
    return this.content.split(/\s+/).length;
});
blogSchema.virtual('estimatedReadTime').get(function () {
    // Average reading speed: 200 words per minute
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
});
blogSchema.virtual('isRecent').get(function () {
    if (!this.publishedAt)
        return false;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.publishedAt >= thirtyDaysAgo;
});
blogSchema.virtual('url').get(function () {
    return `/blog/${this.slug}`;
});
/**
 * Indexes
 */
blogSchema.index({ slug: 1 });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ author: 1, status: 1 });
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ views: -1 });
// Text index for search functionality
blogSchema.index({
    title: 'text',
    content: 'text',
    excerpt: 'text',
    tags: 'text'
}, {
    weights: {
        title: 10,
        excerpt: 5,
        tags: 3,
        content: 1
    },
    name: 'blog_text_index'
});
/**
 * Middleware
 */
// Generate slug before saving
blogSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isNew) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        // Add timestamp if slug exists
        if (this.isNew) {
            this.slug += `-${Date.now()}`;
        }
    }
    // Calculate read time based on content
    if (this.isModified('content')) {
        const wordsPerMinute = 200;
        const wordCount = this.content.split(/\s+/).length;
        this.readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    }
    // Set publishedAt when status changes to published
    if (this.isModified('status') && this.status === BlogStatus.PUBLISHED && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});
// Populate author on find queries
blogSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'author',
        select: 'firstName lastName avatar email'
    });
    next();
});
/**
 * Static Methods
 */
// Get published blogs with pagination
blogSchema.statics.getPublished = function (page = 1, limit = 10, category) {
    const skip = (page - 1) * limit;
    const filter = { status: BlogStatus.PUBLISHED };
    if (category) {
        filter.category = category;
    }
    return this.find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'firstName lastName avatar');
};
// Search blogs
blogSchema.statics.searchBlogs = function (searchTerm, filters = {}) {
    const query = {
        $text: { $search: searchTerm },
        status: BlogStatus.PUBLISHED
    };
    if (filters.category) {
        query.category = filters.category;
    }
    if (filters.tags && filters.tags.length > 0) {
        query.tags = { $in: filters.tags };
    }
    if (filters.author) {
        query.author = filters.author;
    }
    return this.find(query, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' }, publishedAt: -1 })
        .populate('author', 'firstName lastName avatar');
};
// Get popular blogs by views
blogSchema.statics.getPopular = function (limit = 10, days) {
    const query = { status: BlogStatus.PUBLISHED };
    if (days) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        query.publishedAt = { $gte: cutoffDate };
    }
    return this.find(query)
        .sort({ views: -1 })
        .limit(limit)
        .populate('author', 'firstName lastName avatar');
};
// Get related blogs
blogSchema.statics.getRelated = function (blogId, limit = 5) {
    return this.findById(blogId)
        .then((blog) => {
        if (!blog)
            throw new Error('Blog not found');
        return this.find({
            _id: { $ne: blogId },
            status: BlogStatus.PUBLISHED,
            $or: [
                { category: blog.category },
                { tags: { $in: blog.tags } },
                { author: blog.author }
            ]
        }).sort({ publishedAt: -1 })
            .limit(limit)
            .populate('author', 'firstName lastName avatar');
    });
};
// Get blogs by tag
blogSchema.statics.getByTag = function (tag, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.find({
        tags: { $in: [tag.toLowerCase()] },
        status: BlogStatus.PUBLISHED
    }).sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'firstName lastName avatar');
};
// Get blog statistics
blogSchema.statics.getStats = async function () {
    const stats = await this.aggregate([
        {
            $facet: {
                totalStats: [
                    {
                        $group: {
                            _id: null,
                            totalBlogs: { $sum: 1 },
                            publishedBlogs: {
                                $sum: { $cond: [{ $eq: ['$status', BlogStatus.PUBLISHED] }, 1, 0] }
                            },
                            draftBlogs: {
                                $sum: { $cond: [{ $eq: ['$status', BlogStatus.DRAFT] }, 1, 0] }
                            },
                            totalViews: { $sum: '$views' },
                            averageViews: { $avg: '$views' }
                        }
                    }
                ],
                categoryStats: [
                    {
                        $match: { status: BlogStatus.PUBLISHED }
                    },
                    {
                        $group: {
                            _id: '$category',
                            count: { $sum: 1 },
                            totalViews: { $sum: '$views' }
                        }
                    },
                    {
                        $sort: { count: -1 }
                    }
                ],
                monthlyStats: [
                    {
                        $match: {
                            status: BlogStatus.PUBLISHED,
                            publishedAt: { $exists: true }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                year: { $year: '$publishedAt' },
                                month: { $month: '$publishedAt' }
                            },
                            count: { $sum: 1 },
                            views: { $sum: '$views' }
                        }
                    },
                    {
                        $sort: { '_id.year': -1, '_id.month': -1 }
                    },
                    {
                        $limit: 12
                    }
                ]
            }
        }
    ]);
    return stats[0];
};
// Increment view count
blogSchema.statics.incrementViews = function (blogId) {
    return this.findByIdAndUpdate(blogId, { $inc: { views: 1 } }, { new: true });
};
// Get all unique tags
blogSchema.statics.getAllTags = async function () {
    const tags = await this.aggregate([
        {
            $match: { status: BlogStatus.PUBLISHED }
        },
        {
            $unwind: '$tags'
        },
        {
            $group: {
                _id: '$tags',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);
    return tags.map(tag => ({
        name: tag._id,
        count: tag.count
    }));
};
export const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
//# sourceMappingURL=Blog.js.map