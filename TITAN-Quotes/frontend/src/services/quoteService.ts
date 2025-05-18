import axios from 'axios';

// Define the Quote interface
export interface Quote {
  id: number;
  body: string;
  author: string;
  tags: string[];
}

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.config) {
      // Keep error logging for better debugging
      console.error('Frontend API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Fetches random quotes from the backend
 * @param count Number of quotes to fetch (default: 1)
 * @returns Promise with array of quotes
 */
export const fetchQuotes = async (count: number = 1): Promise<Quote[]> => {
  try {
    const response = await api.get<Quote[]>(`/quotes?count=${count}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw new Error('Failed to fetch quotes');
  }
};

/**
 * Fetches quotes by tag from the backend
 * @param tag Tag to filter quotes by
 * @param count Number of quotes to fetch (default: 1)
 * @returns Promise with array of quotes
 */
export const fetchQuotesByTag = async (tag: string, count: number = 1): Promise<Quote[]> => {
  try {
    const response = await api.get<Quote[]>(`/quotes/tag/${tag}?count=${count}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quotes by tag "${tag}":`, error);
    throw new Error(`Failed to fetch quotes by tag "${tag}"`);
  }
}; 