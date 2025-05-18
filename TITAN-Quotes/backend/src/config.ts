import dotenv from 'dotenv';
import * as path from 'path';

// Define default values
const DEFAULT_PORT = 3001;
const DEFAULT_API_KEY = '';  // Empty to force sample data

// Load .env file from the backend root directory
const envPath = path.resolve(__dirname, '../.env');

try {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    // Silent error - will use default values
  }
} catch (error) {
  // Silent error - will use default values
}

// Export configuration with proper fallbacks
export const config = {
  port: process.env.PORT || DEFAULT_PORT,
  // favqsApiKey: '8cdb03dac80baff77700cfd35e66318a',
  favqsApiKey: process.env.FAVQS_API_KEY || DEFAULT_API_KEY,
  favqsApiUrl: 'https://favqs.com/api'
};

export default config; 