import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('Connected to Database');
  } catch (error) {
    console.error('Failed to connect to Database:', error);
    process.exit(1);
  }
};