import React, { useState } from 'react';
import styled from 'styled-components';

interface QuoteFormProps {
  onFetchQuotes: (count: number) => Promise<void>;
  onFetchQuotesByTag: (tag: string, count: number) => Promise<void>;
}

const FormContainer = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #646cff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: #646cff;
  color: white;
  
  &:hover {
    background-color: #535bf2;
  }
`;

const QuoteForm: React.FC<QuoteFormProps> = ({ onFetchQuotes, onFetchQuotesByTag }) => {
  const [count, setCount] = useState<number>(1);
  const [tag, setTag] = useState<string>('');
  
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCount(isNaN(value) ? 1 : Math.max(1, Math.min(20, value)));
  };
  
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  
  const handleRandomQuotes = async () => {
    try {
      await onFetchQuotes(count);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };
  
  const handleQuotesByTag = async () => {
    if (tag.trim()) {
      try {
        await onFetchQuotesByTag(tag.trim(), count);
      } catch (error) {
        console.error('Error fetching quotes by tag:', error);
      }
    }
  };
  
  return (
    <FormContainer>
      <FormTitle>Quote Options</FormTitle>
      
      <FormGroup>
        <Label htmlFor="count">Number of quotes (1-20):</Label>
        <Input 
          type="number" 
          id="count" 
          min="1" 
          max="20" 
          value={count} 
          onChange={handleCountChange} 
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="tag">Filter by tag (optional):</Label>
        <Input 
          type="text" 
          id="tag" 
          value={tag} 
          onChange={handleTagChange} 
          placeholder="Enter a tag like 'life', 'love', etc."
        />
      </FormGroup>
      
      <ButtonGroup>
        <Button onClick={handleRandomQuotes}>
          Get Random Quotes
        </Button>
        <Button onClick={handleQuotesByTag} disabled={!tag.trim()}>
          Get Quotes by Tag
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};

export default QuoteForm; 