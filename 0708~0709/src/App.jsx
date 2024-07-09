import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import {
  contryState,
  equals,
  getLocalStorage,
  negative,
  setLocalStorage,
} from './utils';
import FilterContry from './FilterContry';
import Form from './Form';

export default function App() {
  const [contries, setContries] = useRecoilState(contryState);

  useEffect(() => {
    setLocalStorage('contries', {
      ...getLocalStorage('contries'),
      default: contries,
    });
  }, [contries]);

  const setContriesState = (state) => (contrie) => {
    const equalContry = equals(contrie);
    const negativeEqual = negative((outer) => equalContry(outer));
    if (state === 'remove') {
      setContries((prev) => [...prev.filter(negativeEqual)]);
      return;
    }
    setContries((prev) => [
      ...prev.filter(negativeEqual),
      { ...contrie, state: state },
    ]);
  };

  const setLike = setContriesState('like');
  const setVisit = setContriesState('visited');
  const setDeleting = setContriesState('deleting');
  const setRemove = setContriesState('remove');

  return (
    <main>
      <h2>내가 가고싶은 나라들</h2>
      <Form />
      <FilterContry contries={contries} cur={'deleting'}>
        <button onClick={setVisit}>like</button>
        <button onClick={setRemove}>remove</button>
      </FilterContry>
      <h3>내가 가본 나라들</h3>
      <FilterContry contries={contries} cur={'visited'}>
        <button onClick={setLike}>like</button>
        <button onClick={setDeleting}>delete</button>
      </FilterContry>
      <h3>내가 좋아하는 나라들</h3>
      <FilterContry contries={contries} cur={'like'}>
        <button onClick={setVisit}>dislike</button>
      </FilterContry>
    </main>
  );
}
