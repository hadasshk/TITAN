import express from 'express';
import cors from 'cors';
import { config } from './config';
import quotesRouter from './routes/quotes';

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quotes', quotesRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Debug endpoint to check if API is accessible
app.get('/api/debug', (req, res) => {
  res.status(200).json({ 
    message: 'API is working', 
    timestamp: new Date().toISOString(),
    apiKeyStatus: config.favqsApiKey ? 'API key is set' : 'No API key (using sample data)'
  });
});

// Start server
app.listen(PORT, () => {
  // Server is running on PORT
}); 