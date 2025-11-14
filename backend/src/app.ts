import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

/**
 * Express Application Setup
 * 
 * This file creates and configures the Express application with:
 * - Security middleware (helmet, cors, rate limiting)
 * - Logging middleware (morgan)
 * - Performance middleware (compression)
 * - API routes
 * - Error handling middleware
 * 
 * Key concepts covered:
 * 1. Middleware: Functions that execute during the request-response cycle
 * 2. Security: Protecting against common vulnerabilities
 * 3. Performance: Optimizing response times and resource usage
 * 4. Error Handling: Centralized error management
 * 5. Environment Configuration: Different settings for dev/prod
 */

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

class App {
  public app: Application;
  private readonly PORT: number;

  constructor() {
    this.app = express();
    this.PORT = parseInt(process.env.PORT || '5000', 10);
    
    this.initializeDatabase();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Initialize database connection
   */
  private async initializeDatabase(): Promise<void> {
    await connectDatabase();
  }

  /**
   * Initialize middleware
   * 
   * Middleware order matters! Each middleware is executed in the order it's defined.
   */
  private initializeMiddleware(): void {
    // Security Middleware
    this.app.use(helmet({
      crossOriginEmbedderPolicy: false, // Disable for development
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS Configuration
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // Rate Limiting
    const limiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10), // limit each IP to 100 requests per windowMs
      message: {
        error: 'Too many requests from this IP, please try again later.',
      },
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    this.app.use('/api/', limiter);

    // Performance Middleware
    this.app.use(compression()); // Compress responses

    // Logging Middleware
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev')); // Detailed logging for development
    } else {
      this.app.use(morgan('combined')); // Standard logging for production
    }

    // Body Parsing Middleware
    this.app.use(express.json({ limit: '10mb' })); // Parse JSON bodies (limit for security)
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies
  }

  /**
   * Initialize API routes
   */
  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'success',
        message: 'Hepta Travel API is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      });
    });

    // API Routes
    this.app.use('/api/auth', authRoutes);
    // this.app.use('/api/tours', tourRoutes);
    // this.app.use('/api/bookings', bookingRoutes);
    // this.app.use('/api/blogs', blogRoutes);
    // this.app.use('/api/users', userRoutes);

    // Catch unhandled routes
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`,
      });
    });
  }

  /**
   * Initialize error handling middleware
   * 
   * Error handling middleware should be defined last
   */
  private initializeErrorHandling(): void {
    // Global error handler
    this.app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
      const statusCode = error.statusCode || 500;
      const status = error.status || 'error';
      
      console.error('🚨 Error:', {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
      });

      res.status(statusCode).json({
        status,
        message: error.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      console.error('💥 Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
      console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  }

  /**
   * Start the server
   */
  public listen(): void {
    this.app.listen(this.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${this.PORT}`);
      console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${this.PORT}/health`);
    });
  }
}

// Create and start the application
const app = new App();
app.listen();

export default app;
