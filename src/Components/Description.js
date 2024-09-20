import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 2px 2px;
  font-weight: 500;
  cursor: pointer;
  background-color:  ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
`;

const Desc = styled.p`
  color: black;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;  /* Make the description take up available space */
`;

const Description = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  const maxLength = 125; // Maximum length of the truncated text

  return (
    <div>  
      <Desc>
      {isExpanded ? (text || '') : `${(text || '').substring(0, maxLength)}...`}
      </Desc>
      <Button onClick={toggleReadMore}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </Button>
    </div>
  );
};

export default Description;