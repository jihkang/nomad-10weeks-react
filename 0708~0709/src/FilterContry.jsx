import { Children, cloneElement } from 'react';
import { equals } from './utils';

function filteringStatus(list, status) {
  return list.filter(({ state }) => equals(status)(state));
}

export default function FilterContry({ contries, children, cur }) {
  const filteredContries = filteringStatus(contries, cur);
  return (
    <ul>
      {filteredContries.map((contry) => (
        <li key={`contry-name_${contry.contry}_${cur}`}>
          <p>{contry.contry}</p>
          {Children.map(children, (child) =>
            cloneElement(child, {
              onClick: () => {
                child.props.onClick(contry);
              },
            })
          )}
        </li>
      ))}
    </ul>
  );
}
