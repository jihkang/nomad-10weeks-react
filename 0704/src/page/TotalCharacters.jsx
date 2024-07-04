import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useReducer, useState } from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  @media screen and (min-width: 880px) and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  };
  @media screen and (min-width: 1440px) and (max-width: 18800px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Top = styled.nav`
  display: flex;
  justify-content: center;
  gap : 15px;
  margin-bottom: 20px;
  margin-top: 10px;
  button {
    border-radius: 8px;
    min-width: 100px;
    min-height: 30px;
    font-size: 22px;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      outline: 1px solid;
    }
  }
`;

const fetchTotal = async () => {
  return axios
    .get('https://disney_api.nomadcoders.workers.dev/characters')
    .then(({ data }) => data.flat());
};

const reducer = (state, action) => {
  if (action === 'INCREASE') {
    return state + 1;
  } else {
    return state - 1 >= 0 ? state - 1 : state;
  }
};

export default function TotalCharacters() {
  const [page, setPage] = useReducer(reducer, 0);
  const query = useQuery({
    queryKey: ['total'],
    queryFn: fetchTotal,
  });

  return (
    <>
      {query.isLoading ? (
        'Loading...'
      ) : (
        <>
          <Top>
            <button onClick={() => setPage('DECREASE')}>prev</button>
            <button
              onClick={() => setPage('INCREASE')}
              disabled={(page + 1) * 20 > query?.data?.length}
            >
              next
            </button>
          </Top>
          <Grid>
            {query.data
              .filter((_, i) => i >= page * 20 && i < (page + 1) * 20)
              .map((character) => (
                <Card key={`item_${character.id}`} {...character}>
                  <Link to={`character/${character.id}`}>
                    <img src={character.imageUrl} />
                  </Link>
                </Card>
              ))}
          </Grid>
        </>
      )}
    </>
  );
}
