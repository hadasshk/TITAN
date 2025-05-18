import React from 'react';
import styled from 'styled-components';

// Define the Quote interface
interface Quote {
  id: number;
  body: string;
  author: string;
  tags: string[];
}

// Component props
interface QuoteDisplayProps {
  quote: Quote;
}

const QuoteCard = styled.div`
  background-color:rgb(26, 26, 26);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const QuoteBody = styled.blockquote`
  font-size: 1.4rem;
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-weight: bold;
`;

const QuoteAuthor = styled.p`
  font-weight: bold;
  text-align: right;
  margin-bottom: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #646cff;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote }) => {
  return (
    <QuoteCard>
      <QuoteBody>{quote.body}</QuoteBody>
      <QuoteAuthor>― {quote.author}</QuoteAuthor>
      
      {quote.tags.length > 0 && (
        <TagsContainer>
          {quote.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      )}
    </QuoteCard>
  );
};

export default QuoteDisplay; 