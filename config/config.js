import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4500,
  mongoURI: process.env.MONGODB_URI
};
