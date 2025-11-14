import mongoose from 'mongoose';

/**
 * Database Configuration and Connection
 * 
 * This module handles the MongoDB connection using Mongoose.
 * Key concepts:
 * - Connection pooling for better performance
 * - Error handling for database connection issues
 * - Environment-based configuration
 */

interface ConnectionOptions {
  maxPoolSize: number;
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
  bufferCommands: boolean;
}

const connectionOptions: ConnectionOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  bufferCommands: false // Disable mongoose buffering
};

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.log('⚠️  MONGODB_URI not set - running without database connection');
      console.log('📝 Set MONGODB_URI in .env file to enable database features');
      return;
    }

    console.log('🔄 Connecting to MongoDB...');
    
    const connection = await mongoose.connect(mongoUri, connectionOptions);
    
    console.log(`✅ MongoDB connected successfully: ${connection.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔒 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    console.log('⚠️  Continuing without database - some features may not work');
  }
};

export default connectDatabase;
