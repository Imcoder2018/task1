import mongoose, { Document } from 'mongoose';
import { BlogCategory, BlogStatus } from '../types/index.js';
/**
 * Blog Model
 *
 * This model handles blog posts for the travel website.
 * Key concepts demonstrated:
 *
 * 1. Rich Content Management: Full blog post structure
 * 2. SEO Optimization: Slug generation and meta fields
 * 3. Content Workflow: Draft/Published/Archived status
 * 4. Text Search: Full-text search capabilities
 * 5. Analytics: View tracking and read time calculation
 * 6. Content Categorization: Tags and categories
 */
export interface IBlogDocument extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: mongoose.Types.ObjectId;
    featuredImage: string;
    tags: string[];
    category: BlogCategory;
    status: BlogStatus;
    views: number;
    readTime: number;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Blog: mongoose.Model<IBlogDocument, {}, {}, {}, mongoose.Document<unknown, {}, IBlogDocument, {}, {}> & IBlogDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Blog;
//# sourceMappingURL=Blog.d.ts.map