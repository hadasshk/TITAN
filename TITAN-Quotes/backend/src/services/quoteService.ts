import axios from 'axios';
import config from '../config';

// Define quote interface
interface Quote {
  id: number;
  body: string;
  author: string;
  tags: string[];
}

// Setup for the FavQs API
const API_BASE_URL = config.favqsApiUrl;
const API_KEY = config.favqsApiKey || 'your-api-key';

console.log('QuoteService initialized with API URL:', API_BASE_URL);

// Simple in-memory cache to help with rate limiting
const quoteCache: { [key: string]: { data: Quote[], timestamp: number } } = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_QUOTES = 20;

// Sample quotes to use when API key is not available
const SAMPLE_QUOTES: Quote[] = [
  {
    id: 1,
    body: "Life isn't about getting and having, it's about giving and being.",
    author: "Kevin Kruse",
    tags: ["life", "inspirational"]
  },
  {
    id: 2,
    body: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
    tags: ["inspirational"]
  },
  {
    id: 3,
    body: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
    tags: ["success", "value"]
  },
  {
    id: 4,
    body: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
    author: "Robert Frost",
    tags: ["life", "journey"]
  },
  {
    id: 5,
    body: "I attribute my success to this: I never gave or took any excuse.",
    author: "Florence Nightingale",
    tags: ["success"]
  },
  {
    id: 6,
    body: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    tags: ["inspiration"]
  },
  {
    id: 7,
    body: "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart",
    tags: ["action", "decision"]
  },
  {
    id: 8,
    body: "Every strike brings me closer to the next home run.",
    author: "Babe Ruth",
    tags: ["perseverance"]
  },
  {
    id: 9,
    body: "Definiteness of purpose is the starting point of all achievement.",
    author: "W. Clement Stone",
    tags: ["purpose", "achievement"]
  },
  {
    id: 10,
    body: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    tags: ["life", "planning"]
  }
];

// Helper function to check if cache is valid
const isCacheValid = (cacheKey: string): boolean => {
  if (!quoteCache[cacheKey]) return false;
  const now = Date.now();
  return now - quoteCache[cacheKey].timestamp < CACHE_TTL;
};

// Helper to get random sample quotes
const getRandomSampleQuotes = (count: number): Quote[] => {
  console.log(`Returning ${count} random sample quotes`);
  // Shuffle array and take the first 'count' elements
  return [...SAMPLE_QUOTES]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(count, SAMPLE_QUOTES.length));
};

// Helper to get sample quotes by tag
const getSampleQuotesByTag = (tag: string, count: number): Quote[] => {
  console.log(`Returning ${count} sample quotes filtered by tag: ${tag}`);
  const filteredQuotes = SAMPLE_QUOTES.filter(quote => 
    quote.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
  
  return filteredQuotes
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(count, filteredQuotes.length));
};

/**
 * Fetches random quotes from FavQs API
 * @param count Number of quotes to fetch
 * @returns Array of quotes
 */
export const getQuotes = async (count: number = 1): Promise<Quote[]> => {
  console.log(`getQuotes called with count: ${count}`);
  const cacheKey = `quotes_${count}`;
  
  // Return cached data if available and valid
  if (isCacheValid(cacheKey)) {
    console.log('Returning quotes from cache');
    return quoteCache[cacheKey].data;
  }
  
  // If no API key is provided, use sample data
  if (!API_KEY || API_KEY === 'your-api-key' || API_KEY === 'your-api-key-here') {
    console.log('No valid API key provided, using sample quotes');
    const sampleQuotes = getRandomSampleQuotes(count);
    
    // Save to cache
    quoteCache[cacheKey] = {
      data: sampleQuotes,
      timestamp: Date.now()
    };
    
    return sampleQuotes;
  }
  
  try {
    console.log('Attempting to fetch quotes from FavQs API');
    console.log('API Key status:', API_KEY ? 'API key is set' : 'No API key');
    
    // We'll use the quotes endpoint and get a page of quotes
    const response = await axios.get(`${API_BASE_URL}/quotes`, {
      headers: {
        'Authorization': `Token token=${API_KEY}`
      }
    });
    
    console.log('API response received, status:', response.status);
    console.log('API response received, data:', response.data);
    
    const quotes = response.data.quotes.slice(0, count).map((quote: any) => ({
      id: quote.id,
      body: quote.body,
      author: quote.author,
      tags: quote.tags || []
    }));
    
    console.log(`Processed ${quotes.length} quotes from API`);
    
    // Save to cache
    quoteCache[cacheKey] = {
      data: quotes,
      timestamp: Date.now()
    };
    
    return quotes;
  } catch (error) {
    console.error('Error fetching quotes from FavQs API:', error);
    
    // Fallback to sample quotes if API call fails
    console.log('API call failed, using sample quotes');
    const sampleQuotes = getRandomSampleQuotes(count);
    return sampleQuotes;
  }
};

/**
 * Fetches quotes by tag from FavQs API
 * @param tag Tag to filter quotes by
 * @param count Number of quotes to fetch
 * @returns Array of quotes with the specified tag
 */
export const getQuotesByTag = async (tag: string, count: number = 1): Promise<Quote[]> => {
  console.log(`getQuotesByTag called with tag: ${tag}, count: ${count}`);
  const cacheKey = `tag_${tag}_${count}`;
  
  // Return cached data if available and valid
  if (isCacheValid(cacheKey)) {
    console.log('Returning quotes by tag from cache');
    return quoteCache[cacheKey].data;
  }
  
  // If no API key is provided, use sample data
  if (!API_KEY || API_KEY === 'your-api-key' || API_KEY === 'your-api-key-here') {
    console.log('No valid API key provided, using sample quotes filtered by tag');
    const sampleQuotes = getSampleQuotesByTag(tag, count);
    
    // Save to cache
    quoteCache[cacheKey] = {
      data: sampleQuotes,
      timestamp: Date.now()
    };
    
    return sampleQuotes;
  }
  
  try {
    console.log(`Attempting to fetch quotes with tag "${tag}" from FavQs API`);
    
    const response = await axios.get(`${API_BASE_URL}/quotes`, {
      headers: {
        'Authorization': `Token token=${API_KEY}`
      },
      params: {
        filter: tag,
        page: 1
      }
    });
    
    console.log('API response received for tag search, status:', response.status);
    
    const quotes = response.data.quotes.slice(0, count).map((quote: any) => ({
      id: quote.id,
      body: quote.body,
      author: quote.author,
      tags: quote.tags || []
    }));
    
    console.log(`Processed ${quotes.length} quotes with tag "${tag}" from API`);
    
    // Save to cache
    quoteCache[cacheKey] = {
      data: quotes,
      timestamp: Date.now()
    };
    
    return quotes;
  } catch (error) {
    console.error(`Error fetching quotes for tag '${tag}' from FavQs API:`, error);
    
    // Fallback to sample quotes if API call fails
    console.log('API call failed, using sample quotes filtered by tag');
    const sampleQuotes = getSampleQuotesByTag(tag, count);
    return sampleQuotes;
  }
}; 