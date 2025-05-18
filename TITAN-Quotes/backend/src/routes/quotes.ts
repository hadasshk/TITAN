import express from 'express';
import { getQuotes, getQuotesByTag } from '../services/quoteService';

const router = express.Router();

// GET /api/quotes?count=5
// Returns a specified number of random quotes
router.get('/', async (req, res) => {
  const count = parseInt(req.query.count as string) || 1;
  
  try {
    const quotes = await getQuotes(count);
    
    // Additional validation to ensure we have proper data
    if (!Array.isArray(quotes)) {
      console.error('[BACKEND] Invalid quotes data (not an array):', quotes);
      res.status(500).json({ error: 'Invalid quotes data returned from service' });
      return;
    }
    
    res.json(quotes);
  } catch (error: any) {
    console.error('[BACKEND] Error fetching quotes:', error.message);
    res.status(500).json({ error: 'Failed to fetch quotes', message: error.message });
  }
});

// GET /api/quotes/tag/:tag?count=5
// Returns a specified number of quotes filtered by tag
router.get('/tag/:tag', async (req, res) => {
  const tag = req.params.tag;
  const count = parseInt(req.query.count as string) || 1;
  
  try {
    const quotes = await getQuotesByTag(tag, count);
    
    // Additional validation to ensure we have proper data
    if (!Array.isArray(quotes)) {
      console.error('[BACKEND] Invalid quotes data (not an array):', quotes);
      res.status(500).json({ error: 'Invalid quotes data returned from service' });
      return;
    }
    
    res.json(quotes);
  } catch (error: any) {
    console.error(`[BACKEND] Error fetching quotes with tag "${tag}":`, error.message);
    res.status(500).json({ error: 'Failed to fetch quotes by tag', message: error.message });
  }
});

export default router; 