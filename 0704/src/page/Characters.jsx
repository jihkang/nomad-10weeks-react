import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import Loading from '../components/Loading';

const Container = styled.div`
  width: 50%;
  max-width: 680px;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  p {
    display: block;
    background: white;
    color: black;
  }
  .film {
    display: flex;
    flex-wrap: wrap;
    gap : 15px;
  }
  img {
    border-radius: 100%;
    width: 50%;
    height: 50%;
    loading: lazy;
    aspect-ratio: 1/1;
  }
`;

const useCharacterData = ({ queryKey }) => {
  console.log(queryKey);
  return axios
    .get(
      'https://disney_api.nomadcoders.workers.dev/characters/:id'.replace(
        ':id',
        queryKey
      )
    )
    .then(({ data }) => data);
};

export default function Character() {
  const params = useParams();
  const query = useQuery({
    queryKey: [params.id],
    queryFn: useCharacterData,
  });
  console.log(query.data);
  return (
    <>
      {query.isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Link to="/">Home</Link>
          <Card {...query.data}>
            <img src={query.data.imageUrl} />
          </Card>
          <div className="film">
            {query.data.films.map((film) => (
              <p>{film}</p>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
