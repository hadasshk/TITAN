import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteForm from './components/QuoteForm';
import { fetchQuotes, fetchQuotesByTag } from './services/quoteService';

// Define the Quote interface
interface Quote {
  id: number;
  body: string;
  author: string;
  tags: string[];
}

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const AppTitle = styled.h1`
  margin-bottom: 2rem;
  color: #646cff;
`;

const NoResults = styled.div`
  display: block;
  margin-bottom: 0.5rem;
  background-color:rgb(255, 100, 121);
  color: black;
  border-radius: 5rem;
  font-weight: bold;
`;

const App: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchQuotes = async (count: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchQuotes(count);
      setQuotes(data);
    } catch (err) {
      setError('Failed to fetch quotes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchQuotesByTag = async (tag: string, count: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchQuotesByTag(tag, count);
      setQuotes(data);
    } catch (err) {
      setError(`Failed to fetch quotes with tag "${tag}". Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a quote when component mounts
  useEffect(() => {
    handleFetchQuotes(1);
  }, []);

  return (
    <AppContainer>
      <AppTitle>Quotes of the Day</AppTitle>

      <QuoteForm
        onFetchQuotes={handleFetchQuotes}
        onFetchQuotesByTag={handleFetchQuotesByTag}
      />

      {loading && <p>Loading quotes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {quotes.length > 0 ? (
        <div>
          {quotes.map((quote) => (
            <QuoteDisplay key={quote.id} quote={quote} />
          ))}
        </div>
      ) : <NoResults>No quotes found</NoResults>}
    </AppContainer>
  );
};

export default App; 