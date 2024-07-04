import { useRef } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-radius: 5%;
  color: white;
  margin-bottom: 5px;
  padding-bottom: 10px;
  & a > img {
    width: 80%;
    height: 80%;
    max-width: 250px;
    min-width: 200px;
    border-radius: 100%;
    aspect-ratio: 1/1;
    loading: lazy;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    &: a {
      background: gray;
    };
    
  }
`;

export default function Card({ name, imageUrl, children }) {
  const ref = useRef();
  return (
    <StyledCard>
      {children}
      {name}
    </StyledCard>
  );
}
